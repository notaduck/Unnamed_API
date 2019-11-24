const winston = require('winston');

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				winston.format.prettyPrint(),
				winston.format.splat(),
				winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
			)
		},
		new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
		)
	]
});


module.exports = logger;
