const express = require('express');
const router = express();
const { User, validate } = require('../models/user');
const HttpStatus = require('http-status-codes');

require('express-async-errors');

router.post('/signup', async(req, res) => {

	const { error } = validate(req.body);
	if (error) return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);

	const {name, email, password, passwordConfirm} = req.body;

	let user = await User.findOne({email});
	if (user) return res.status(HttpStatus.BAD_REQUEST).send('User already registered');

	user = new User({
		name,
		email,
		password,
		passwordConfirm
	});

	await user.save();

	res.status(HttpStatus.CREATED).send(user);
});

module.exports = router;
