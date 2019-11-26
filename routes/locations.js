const express = require('express');
const HttpStatus = require('http-status-codes');
require('express-async-errors');
const { Location, validate } = require('../models/locations');
const upload = require('../services/file-upload');
// const fs = require('fs');
// var util = require('util');


const router = express();
const singleUpload = upload.single('image');

router.get('/', async (req, res) => {
	const locations = await Location.find();
	res.status(HttpStatus.OK).json(locations);
});


router.get('/:id', async (req, res) => {
	const location = await Location.findById(req.params.id);
	if (!location) res.status(HttpStatus.NOT_FOUND).send('No location with the given id was found');
	res.status(HttpStatus.OK).json(location);
});

router.post('/', async (req, res) => {

	const { error } = validate(req.body);

	if (error) return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);

	let location = new Location({
		coordinate: {
			longitude: req.body.coordinate.longitude,
			latitude: req.body.coordinate.latitude,
		},
		description: req.body.description,
		title: req.body.title,
		isAPlayground: req.body.isAPlayground,
		images: []
	});

	location = await location.save();

	res.status(HttpStatus.OK).json(location);

});



module.exports = router;
