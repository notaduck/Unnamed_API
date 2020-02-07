const crypto = require('crypto');
const Joi = require('joi');
const mongoose = require('mongoose');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 55
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 55,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
		select: false
	},
	passwordChangedAt: {
		type: Date
		// select: false
	},
	passwordResetToken: String,
	passwordResetExpires: Date
});

userSchema.pre('save', async function (next) {

	if (!this.isModified('password')) return next();

	this.password = await bcryt.hash(this.password, 12);

	next();
});

userSchema.methods.changedPasswordAfter = function (jwt_timestamp) {

	if (this.passwordChangedAt) {
		const passwordChangedAt_mili_secs = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

		return jwt_timestamp < passwordChangedAt_mili_secs;
	}

	return false;
};

userSchema.methods.createPasswordResetToken = function () {

	const reset_token = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto.createHash('sha256').update(reset_token).digest('hex');
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // expires after ten minutes

	return reset_token;
};

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
	return await bcryt.compare(candidatePassword, userPassword);
};


userSchema.methods.signToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
};

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
	const schema = {
		name: Joi.string().min(2).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
		passwordConfirm: Joi.ref('password')
	};
	return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
