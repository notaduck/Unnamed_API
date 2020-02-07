const express = require('express');
const router = express();
const HttpStatus = require('http-status-codes');
const Joi = require('joi');

const { User, validate } = require('../models/user');
const { auth } = require('../middelware/auth');
const sendMail = require('../utils/email');
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

router.post('/forgotPassword', async (req, res) => {

	const { email, password } = req.body;
	const { error } = validateForgotPassword(req.body);

	if (error) return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);

	let user = await User.findOne({ email });
	if (!user) return res.status(HttpStatus.BAD_REQUEST).send('Email is not found.');


	// Generate reset token
	const reset_token = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false }); // disable schema validation.

	const reset_url = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${reset_token}`;
	const message = `Forgot your password?\nSubmit a new one from: ${reset_url}\nif you didn't, please ifnore this email`;

	await sendMail({
		email,
		subject: 'Your password reset token, valid for 10 minutes.',
		message
	});

	res.status(HttpStatus.OK).json({
		status: 'success',
		message: `token send to ${user.email}`
	});


});

router.patch('/resetPassword/:token', async (req, res) => {

});

// router.post('/msg', auth, async (req, res) => {
// 	res.status(HttpStatus.OK).json({
// 		msg: 'msg called',
// 	});

// });
const validateForgotPassword = (user) => {
	const schema = {
		email: Joi.string().min(5).max(255).required().email()
		// password: Joi.string().min(5).max(255).required(),
	};
	return Joi.validate(user, schema);
};

const validateEmailandPassword = (user) => {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	};
	return Joi.validate(user, schema);
};

module.exports = router;
