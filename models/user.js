<<<<<<< HEAD
const mongoose = require('mongoose');
const Joi = require('joi');
=======
const Joi = require('joi');
const mongoose = require('mongoose');
>>>>>>> ab1c7cfc6170af22d568cd8f38a0a1eff00f670d

const User = mongoose.model('User', new mongoose.Schema({
	name: {
		type: String,
		required: true,
<<<<<<< HEAD
		minlength: 2,
		maxlength: 55
=======
		minlength: 5,
		maxlength: 50
>>>>>>> ab1c7cfc6170af22d568cd8f38a0a1eff00f670d
	},
	email: {
		type: String,
		required: true,
<<<<<<< HEAD
		minlength: 2,
		maxlength: 55,
		unique: true

=======
		minlength: 5,
		maxlength: 255,
		unique: true
>>>>>>> ab1c7cfc6170af22d568cd8f38a0a1eff00f670d
	},
	password: {
		type: String,
		required: true,
<<<<<<< HEAD
		minlength: 10,
		maxlength: 1024
=======
		minlength: 5,
		maxlength: 1024,
>>>>>>> ab1c7cfc6170af22d568cd8f38a0a1eff00f670d
	}
}));

const validateUser = (user) => {
<<<<<<< HEAD
	const schema ={
		name: Joi.string().min(5).max(55).required(),
		email: Joi.string().min(5).max(55).required().email(),
		passworr: Joi.string().min(5).max(255).required(),
	};
=======
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	};

>>>>>>> ab1c7cfc6170af22d568cd8f38a0a1eff00f670d
	return Joi.validate(user, schema);
};

exports.User = User;
<<<<<<< HEAD
exports.validate = validateUser;
=======
exports.validate = validateUser; 
>>>>>>> ab1c7cfc6170af22d568cd8f38a0a1eff00f670d
