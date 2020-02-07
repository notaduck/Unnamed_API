const express = require('express');
const router = express();
const { User, validate } = require('../models/user');
const HttpStatus = require('http-status-codes');
const Joi = require('joi');
const { auth } = require('../middelware/auth');

router.post('/signup', async (req, res) => {

	const { error } = validate(req.body);
	if (error) return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);

	const { name, email, password, passwordConfirm } = req.body;

	let user = await User.findOne({ email });
	if (user) return res.status(HttpStatus.BAD_REQUEST).send('User already registered');

	user = new User({
		name,
		email,
		password,
		passwordConfirm
	});

	await user.save();

	res.status(HttpStatus.CREATED).json({
		token: user.signToken(),
		data: {
			user: user
		}
	});
});

router.get('/login', async (req, res) => {
	const { email, password } = req.body;
	const { error } = validateEmailandPassword(req.body);

	if (error) {
		return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return res.status(HttpStatus.BAD_REQUEST).send('Incorrect email or password');
	}

	res.status(HttpStatus.OK).json({
		token: user.signToken(),
	});

});

router.post('/msg', auth, async (req, res) => {
	res.status(HttpStatus.OK).json({
		msg: 'msg called',
	});

});

const validateEmailandPassword = (user) => {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	};
	return Joi.validate(user, schema);
};

module.exports = router;
