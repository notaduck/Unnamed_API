const winston = require('winston');

const config = {
	file: {
		filename: 'logs/error.log',
		level: 'error'
	},
	console: {
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.timestamp(),
			winston.format.prettyPrint(),
			winston.format.splat(),
			winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}\n ${info.stack}`)
		)
	}
};

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(config.console),
		new winston.transports.File(config.file),
	]
});

process.on('uncaughtException', function (err) {
	logger.error('uncaughtException: ', { message: err.message, stack: err.stack }); // logging with MetaData
	// process.exit(1); // exit with failure
});



module.exports = logger;
