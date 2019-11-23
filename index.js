const express = require('express');
const log = require('./services/logger.js');
const app = express();
const PORT = process.env.PORT || 3000;

require('./services/db.js')(log);

const server = app.listen(PORT, () => {
	log.info(`App is running on port ${PORT}`);
});

module.exports = server;






