import { Api, JsonRpc } from 'eosjs';
import * as ecc from 'eosjs-ecc';
import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs2';
import history from 'utils/history';

type Scatter = typeof ScatterJS.scatter;

export interface EOSNetwork {
  blockchain: string;
  host: string;
  port: number;
  protocol: string;
  expireInSeconds: number;
  chainId: string;
}

class EOSIOClient {
  private dappName: string;
  private rpc?: JsonRpc;
  private scatter?: Scatter;
  public api?: Api;
  public eos: any;
  public error: string;
  public account: any;
  public environment: any;
  public games: Object[];
  public calls: Object[];
  public movement: any;
  public nonce: any;

  private network: any;

  constructor(dappName: string, environment: any) {
    this.dappName = dappName;
    this.environment = environment;
    this.games = [];
    this.calls = [];
    this.movement = {};
    this.nonce = {};
    this.error = '';
    // (window as any).ScatterJS = null;
  }

  public init = async () => {
    ScatterJS.plugins(new ScatterEOS());
    // const connectionOptions = { };
    const connectionOptions = { initTimeout: 15000, linkTimeout: 600000 };

    try {
      console.log('this.environment', this.environment.network);
      
      this.network = ScatterJS.Network.fromJson(this.environment.network);
      this.rpc = new JsonRpc(this.network.fullhost());

      const connected = await ScatterJS.scatter.connect(
        this.dappName,
        { network: this.network },
        connectionOptions
      )
      if (!connected) {
        throw new Error(
          "We couldn't connect to Scatter Desktop. Please setup scatter or install it."
        );
      }
      this.scatter = ScatterJS.scatter;
    } catch (error) {
      return this.showScatterError(error);
    }
  };

  public showScatterError = (error: any) => {
    if (!error) return;
    console.log('EOSIOClient::showScatterError error', error);
    let msg = error.message;

    if (error.type === 'account_missing' && error.code === 402) {
      msg =
        'Missing required accounts, repull the identity. Choose account the same as added in Scatter.';
    } else if (error.type === 'identity_rejected' && error.code === 402) {
      msg = 'Please accept Identity request';
    } else if (error.type === 'locked' && error.code === 423) {
      msg = 'Your Scatter wallet is locked';
    } else if (error.type === 'signature_rejected' && error.code === 402) {
      msg = 'Voting Transaction canceled (you rejected signature request)';
    } else if (error.code === 500) {
      msg = "You can't close game in the middle";
    }
    this.error = msg;
    console.log('EOSIOClient::showScatterError msg', msg);
    return msg;
  };

  public showErr(error: any) {
    let error_;
    console.error('EOSIOClient::showErr', error);
    try {
      if (error.message){
        this.error = error.message;
        return error.message;
      }
      error_ = JSON.parse(error);
      this.error = error_.error.details[0].message;
      return this.error;
    } catch (e) {
      this.error = 'Strange issue happen';
      return 'Strange issue happen';
    }
  }

  public getAccount = () => {
    this.account = ScatterJS.account('eos');
    // this.scatter &&
    // this.scatter.identity &&
    // this.scatter.identity.accounts.find(
    //   (x: { blockchain: string }) => x.blockchain === 'eos'
    // );
    return this.account;
  };

  public connect = async () => {
    await this.init();
    if (this.scatter && !this.error) {
      const requiredFields = { accounts: [this.network] };
      try {
        const identity = await this.scatter.getIdentity(requiredFields);
        this.eos = ScatterJS.eos(this.network, Api, { rpc: this.rpc });
        return identity;
      } catch (error) {
        this.showScatterError(error);
        return null;
      }
    } else {
      return null;
    }
  };

  public getUser = () => {
    this.connect()
      .then(() => {
        return this.getAccount();
      })
      .catch((error) => {
        return null;
      });
  };

  public logout = async () => {
    if (this.scatter) {
      await this.scatter.forgetIdentity();
    }
  };

  public setPlayer(name: string) {
    let namesArr = localStorage.getItem('players');
    if (!namesArr) {
      localStorage.setItem('players', name);
      return;
    } else if (namesArr.indexOf(name) > -1) {
      return;
    }
    namesArr = namesArr + ',' + name;
    localStorage.setItem('players', namesArr);
  }


  public findGame(challenger: any) {
    let found = false;
    this.games.forEach((elem: any) => {
      if (elem.challenger === challenger) {
        history.push(`/games/${elem.id}`);//${challenger}/
        found = true;
      }
    });
    if (!found) {
      setTimeout(() => {
        this.findGame(challenger);
      }, 200);
    }
  }

  public async getGameChallenges() {
    if (!this.account.name || !this.rpc) {
      return { games: [], error: 'Login first' };
    }
    try {
      const games = await this.rpc.get_table_rows({
        json: true,
        scope: this.environment.gcontract,
        code: this.environment.gcontract,
        table: 'games',
        limit: 100,
        table_key: 'host',
        lower_bound: this.account.name,
        upper_bound: this.account.name + 'a',
        key_type: 'i64',
        index_position: 2
      });
      this.games = games.rows;
      return { games, error: null };
    } catch (error) {
      this.games = [];
      return { games: [], error: this.showErr(error) };
    }
  }

  public async getMyGamesCalls() {
    if (!this.account.name || !this.rpc) {
      return { games: [], error: 'Login first' };
    }
    try {
      const calls = await this.rpc.get_table_rows({
        json: true,
        scope: this.environment.gcontract,
        code: this.environment.gcontract,
        table: 'games',
        limit: 100,
        table_key: 'challenger',
        lower_bound: this.account.name,
        upper_bound: this.account.name + 'a',
        key_type: 'i64',
        index_position: 3
      });
      this.calls = calls.rows;
      return { calls, error: null };
    } catch (error) {
      this.calls = [];
      return { calls: [], error: this.showErr(error) };
    }
  }

  public async createGame(challenger: string) {
    if (challenger === this.account.name) {
      throw new Error("Account can't be the same.");
    }
    if (challenger.length !== 12) {
      throw new Error('Account name must be 12 characters!');
    }
    this.setPlayer(challenger);
    
    try {
      const account = ScatterJS.account('eos');

      const transact = await this.eos.transact(
        {
          actions: [
            {
              account: this.environment.gcontract,
              name: 'create',
              authorization: [
                {
                  actor: account.name,
                  permission: account.authority
                }
              ],
              data: {
                challenger,
                host: this.account.name
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        }
      );
      this.findGame(challenger)
      return { transact };
    } catch (error) {
      console.log('EOSIOClient::createGame', error);
      return { error };
    }

  }

  public async closeGame(id: string) {
    try {
      const account = ScatterJS.account('eos');
      const transact = await this.eos.transact(
        {
          actions: [
            {
              account: this.environment.gcontract,
              name: 'close',
              authorization: [
                {
                  actor: account.name,
                  permission: account.authority
                }
              ],
              data: {
                id: Number(id),
                host: this.account.name
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
          broadcast: true,
        }
      );
      return { transact };
    } catch (error) {
      console.log('EOSIOClient::closeGame', error);
      return { error };
    }
  }

  public async restartGame(id: string) {
    try {
      const account = ScatterJS.account('eos');
      const host = this.account.name;
      // const contract = await this.eos.getContract(this.environment.gcontract);
      const transact = await this.eos.transact(
        {
          actions: [
            {
              account: this.environment.gcontract,
              name: 'restart',
              authorization: [
                {
                  actor: account.name,
                  permission: account.authority
                }
              ],
              data: {
                id: Number(id),
                host
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
          broadcast: true,
        }
      );
      return { transact };
    } catch (error) {
      console.log('EOSIOClient::restartGame', error);
      return { error };
    }
  }

  public async move01(
    id: string,
    move: number,
    challenger: string,
    by: number
  ) {
    
    const host = this.account.name;
    this.movement[host] = move;
    this.nonce[host] = Math.floor(Math.random() * 100000000 + 1);

    this.setGame(`rps_${id}_move`, `${this.movement[host]}`);
    this.setGame(`rps_${id}_nonce`, `${this.nonce[host]}`);
    
    let my_move = this.movement[host] + '' + this.nonce[host];
    let move_hash = ecc.sha256(my_move);
    let by_name = by === 1 ? host : challenger;
    try {
      const account = ScatterJS.account('eos');
      
      const transact = await this.eos.transact(
        {
          actions: [
            {
              account: this.environment.gcontract,
              name: 'move1',
              authorization: [
                {
                  actor: account.name,
                  permission: account.authority
                }
              ],
              data: {
                id: Number(id),
                by: by_name,
                move_hash
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
          broadcast: true
        }
      );
      return { transact };
    } catch (error) {
      console.log('EOSIOClient::move01', JSON.stringify(error));
      return { error };
    }
  }

  public async move02(id: string, challenger: string, by: number) {
    let host = this.account.name;
    let by_name = by === 1 ? host : challenger;

    if (!this.nonce[host]) {
      this.nonce[host] = Number(this.getGame(`rps_${id}_nonce`));
    }
    if (!this.movement[host]) {
      this.movement[host] = Number(this.getGame(`rps_${id}_move`));
    }

    try {
      const account = ScatterJS.account('eos');
      const transact = await this.eos.transact(
        {
          actions: [
            {
              account: this.environment.gcontract,
              name: 'move2',
              authorization: [
                {
                  actor: account.name,
                  permission: account.authority
                }
              ],
              data: {
                id: Number(id),
                by: by_name,
                pmove: this.movement[host],
                pmove_nonce: this.nonce[host]
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
          broadcast: true
        }
      );
      return { transact };
    } catch (error) {
      console.log('EOSIOClient::move01', JSON.stringify(error));
      return { error };
    }
  }

  public setGame(cname: string, cvalue: string) {
    localStorage.setItem(cname, cvalue);
  }

  public getGame(cname: string) {
    return localStorage.getItem(cname);
  }

  public clearCachedGames(id: string) {
    for (let key in localStorage) {
      if (key.indexOf(`rps_${id}`) >= 0) {
        localStorage.removeItem(key);
      }
    }
  }

  copyToClipboard(text: string) {
    window.navigator.clipboard.writeText(text).then(
      () => {
        return {
          message: 'Copying to clipboard was successful!',
          status: 'success'
        };
      },
      (err: any) => {
        return {
          message: 'Could not copy text',
          status: 'danger'
        };
      }
    );
  }
}

export default EOSIOClient;
