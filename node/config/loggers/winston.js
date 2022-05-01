//configuration for winston logger
const winston = require('winston');
let {config} = require("../index");
let FormatLog = config.dev ? 'console' : 'file';
let objWinston = config.dev ? { level: 'verbose' } : { level: 'info', filename: 'winston.log', level: "warn" };

let logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports[FormatLog][objWinston]
    ]
});

module.exports = logger;