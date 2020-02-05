const Joi = require('joi');
const mongoose = require('mongoose');
const bcryt = require('bcrypt');

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
	},
});

userSchema.pre('save', async function (next) {

	if (!this.isModified('password')) return next();

	this.password = await bcryt.hash(this.password, 12);
	next();
});


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
