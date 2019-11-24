const express = require('express');
const HttpStatus = require('http-status-codes');
const { Location, validate } = require('../models/locations');

const router = express();

router.get('/', async (req, res) => {
	const locations = await Location.find();
	console.log();
	res.status(HttpStatus.OK).json(locations);
});

module.exports = router;
