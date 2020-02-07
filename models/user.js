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
});

userSchema.pre('save', async function (next) {

	if (!this.isModified('password')) return next();

	this.password = await bcryt.hash(this.password, 12);

	next();
});

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
