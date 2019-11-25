const express = require('express');
const HttpStatus = require('http-status-codes');
const upload = require('../services/file-upload');
require('express-async-errors');

const singleUpload = upload.single('image');


const router = express();

router.post('/image-upload', async (req, res) => {

	singleUpload(req, res, (err) => {
		if (err) res.send(err);

		return res.json({
			'imageUrl': req.file.location
		});

	});
});

module.exports = router;

