/*
* Created by Rost
*/
const path = require('path');

module.exports = function(router, config, request, log) {

	const indexPath = path.join(__dirname, '../../build/index.html');

	router.get('/', (req, res) => {
	   	res.sendFile(indexPath);
	});

	router.get('/top', (req, res) => {
	   	res.sendFile(indexPath);
	});

	router.get('/games', (req, res) => {
	   	res.sendFile(indexPath);
	});

};




