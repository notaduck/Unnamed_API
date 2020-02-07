const cors = require('cors');
const express = require('express');

const locations = require('../routes/locations.js');
const users = require('../routes/users');

// const error = require('../middleware/error.js');

module.exports = function (app) {

	app.use(express.json());

	// I need to read up on cors before !!!!
	// https://flaviocopes.com/express-cors/
	app.use('/api/locations', cors(), locations);
	app.use('/api/users', cors(), users);
};
