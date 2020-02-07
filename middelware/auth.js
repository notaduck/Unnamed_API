const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User } = require('../models/user');

async function auth(req, res, next) {

	// Get the JWT token from the header.
	let token;

	if (req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');

	// TODO: I need to handle the JsonWebTokenError when an incorrect token is passed to the funciton, maybe a global error handler.
	// Verify the token.
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// Check if the user still exists.
	const user = await User.findById(decoded.id);

	if (!user) res.status(HttpStatus.BAD_REQUEST).json({
		status: 'failed',
		msg: 'The user does not exists any more'
	});

	// Check if the user changed the password after the jwt token was issued.
	if (user.changedPasswordAfter(decoded.iat)) res.status(HttpStatus.BAD_REQUEST).json({
		status: 'failed',
		msg: 'User recently changed the passsword, please log in again'
	});

	next();
}

exports.auth = auth;