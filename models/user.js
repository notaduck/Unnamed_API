const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 55
	},
	email: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 55,
		unique: true

	},
	password: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 1024
	}
}));

const validateUser = (user) => {
	const schema ={
		name: Joi.string().min(5).max(55).required(),
		email: Joi.string().min(5).max(55).required().email(),
		passworr: Joi.string().min(5).max(255).required(),
	};
	return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
