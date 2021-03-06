// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/*const chain = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'; 
export const environment = {
	production: true,
	gcontract: 'roshambogame',
	network : {
    	blockchain: 'eos',
    	host: 'bp.cryptolions.io',
    	port: 443,
    	protocol: 'https',
    	expireInSeconds: 120,
    	chainId: chain
	},
	chain: chain,
	Eos: {
		httpEndpoint: 'http://bp.cryptolions.io',
		chainId: chain,
		verbose: false
	},
	botName: 'roshambopunk',
	version: '1.1.0',
	style: {
		body: { 
			background: "url('./assets/images/section-background.svg') 50% 17vh no-repeat,linear-gradient(to left top,#09c5f9,#3483d9) no-repeat"
		},
		ukLabel: {
			background: "#3387db"
		},
		ukButtonPrimary: {
			background: "#3387db",
			'box-shadow': '',
			border: ''
		},
		logoText: 'roshambo',
		title: 'roshambo EOS game | by Cryptolions'
	}
};*/
const chain = 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'; 
export const environment = {
	production: true,
	gcontract: 'roshambogame',
	network : {
    	blockchain: 'eos',
    	host: 'jungle2.cryptolions.io',
    	port: 443,
    	protocol: 'https',
    	expireInSeconds: 120,
    	chainId: chain
	},
	chain: chain,
	Eos: {
		httpEndpoint: 'https://jungle2.cryptolions.io',
		chainId: chain,
		verbose: false
	},
	botName: 'roshamboebot',
	version: '1.1.0',
	style: {
		body: { 
			background: "url('./assets/images/section-background.svg') 50% 17vh no-repeat,linear-gradient(to left top, #218838bf, #218838) 0 0 no-repeat"
		},
		ukLabel: {
			background: "#209362"
		},
		ukButtonPrimary: {
			color: "#209362",
			'box-shadow': 'none',
			'border': '1px solid #209362'
		},
		logoText: 'Jungle roshambo',
		title: 'Jungle roshambo EOS game | by Cryptolions'
	}
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
