const cors = require('cors');
const express = require('express');

const locations = require('../routes/locations.js');

// const error = require('../middleware/error.js');

module.exports = function (app) {
	// I need to read up on cors before !!!!
	// https://flaviocopes.com/express-cors/
	app.use(express.json());
	app.use('/api/locations', cors(), locations);
};
