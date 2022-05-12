const {config}  = require("../index");
const pino = require('pino');
const pretty = require('pino-pretty');
const devMode = config.dev || true;
 const stream = pretty({
  colorize: true,
}) 


const logger = devMode ? pino(stream) : pino(pinoTee);

module.exports = logger;