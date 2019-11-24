const mongoose = require('mongoose');
const Joi = require('joi');

const Location = mongoose.model('Location', new mongoose.Schema({
	id: {
		type: Number,
	},
	coordinate: {
		latitude: {
			type: Number,
		},
		longitude: {
			type: Number,
		},
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	IsAPlayground: Boolean,

}));

function validateLocation(location) {
	const schema = {
		coordinate: Joi.object().keys({
			longitude: Joi.number().min(-180).max(180).required(),
			latitude: Joi.number().min(-90).max(90).required(),
		}),
		title: Joi.string().min(5).max(1000).required(),
		description: Joi.string().min(5).max(500).required(),
		isAPlayground: Joi.bool().required(),
	};

	return Joi.validate(location, schema);
}

exports.Location = Location;
exports.validate = validateLocation;
