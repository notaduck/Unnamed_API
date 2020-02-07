const express = require('express');
const HttpStatus = require('http-status-codes');
const { Location, validate } = require('../models/locations');
const titleFormatter = require('../utils/titleFormatter');

const router = express();

router.get('/', async (req, res) => {

	const locations = await Location.find();

	res.status(HttpStatus.OK).json(locations);

});

router.get('/:id', async (req, res) => {

	const location = await Location.findById(req.params.id);

	if (!location)
		res.status(HttpStatus.NOT_FOUND)
			.send('No location with the given id was found');

	res.status(HttpStatus.OK).json(location);

});

router.post('/', async (req, res) => {

	const { error } = validate(req.body);

	if (error)
		return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);

	const formattedTitle = titleFormatter(req.body.title);

	let location = new Location({
		coordinate: {
			longitude: req.body.coordinate.longitude,
			latitude: req.body.coordinate.latitude
		},
		description: req.body.description,
		title: formattedTitle,
		type: req.body.type,
		images: []
	});

	location = await location.save();

	res.status(HttpStatus.OK).json(location);

});

module.exports = router;
