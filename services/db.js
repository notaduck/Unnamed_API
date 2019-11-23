require('dotenv').config();
const log = require('./logger.js');
const mongoose = require('mongoose');

module.exports = function()  {
	log.info('HELLO WORLD');
	mongoose.connect(process.env.DB_CONNECTION_STRING,
		{ useNewUrlParser: true })
		.then(() => log.info('Connected to MongoDB...'))
		.catch(e => log.info(e));

};
