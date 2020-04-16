import { Api, JsonRpc } from "eosjs";
declare class EOSIOClient {
    private dappName;
    rpc: JsonRpc;
    private scatter?;
    api?: Api;
    constructor(dappName: string);
    init: () => Promise<void>;
    getAccount: () => any;
    connect: () => Promise<void>;
    logout: () => Promise<void>;
}
export default EOSIOClient;