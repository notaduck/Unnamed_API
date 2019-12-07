const express = require('express');
const HttpStatus = require('http-status-codes');
require('express-async-errors');
const { Location, validate } = require('../models/locations');
const upload = require('../services/file-upload');

const router = express();
const singleUpload = upload.single('image');

router.get('/', async (req, res) => {
	const locations = await Location.find();
	res.status(HttpStatus.OK).json(locations);
});

router.get('/:id', async (req, res) => {
	const location = await Location.findById(req.params.id);
	if (!location)
		res
			.status(HttpStatus.NOT_FOUND)
			.send('No location with the given id was found');
	res.status(HttpStatus.OK).json(location);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);

	if (error)
		return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);

	// Make every word in a given string start with a capital letter, this should be moved outside of the router 

	const title = req.body.title;
	const titleArrary = title.split(' ');
	const transformedTitle = [];

	for(let i = 0; i < titleArrary.length; i ++) {
		titleArrary[i].charAt(0).toUpperCase() + titleArrary[i].substr(1,titleArrary[i].length);
		transformedTitle.push(titleArrary[i].charAt(0).toUpperCase() + titleArrary[i].substr(1,titleArrary[i].length)
		);
	}
	

	let location = new Location({
		coordinate: {
			longitude: req.body.coordinate.longitude,
			latitude: req.body.coordinate.latitude
		},
		description: req.body.description,
		title: transformedTitle.join(' '),
		type: req.body.type,
		images: []
	});

	location = await location.save();

	res.status(HttpStatus.OK).json(location);
});

router.put('/:id', async (req, res) => {
	singleUpload(req, res, async err => {
		if (err)
			res
				.status(HttpStatus.UNPROCESSABLE_ENTITY)
				.send({
					errors: [{ title: 'Something went wrong.', detail: err.message }]
				});
		console.log(req.file);

		const image_key = req.file.location;

		const location = await Location.findByIdAndUpdate(req.params.id, {
			$push: { images: image_key }
		});

		res.send(location);
	});
});
module.exports = router;
