const cors = require('cors');
const express = require('express');

const locations = require('../routes/locations.js'),
	users = require('../routes/users'),
	images = require('../routes/file-upload');

// const error = require('../middleware/error.js');

module.exports = function (app) {
	// I need to read up on cors before !!!!
	// https://flaviocopes.com/express-cors/
	app.use(express.json());
	app.use('/api/locations', cors(), locations);
	app.use('/api/users', cors(), users);
	app.use('/api/files', cors(), images);
};
