const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

	// transort configuration
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	const mailOptions = {
		from: 'Daniel Guldberg <dan@it.io',
		to: options.email,
		subject: options.email,
		text: options.message
	};

	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;