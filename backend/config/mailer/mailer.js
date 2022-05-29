const nodemailer = require('nodemailer');
//trae logger de loggers
const logger = require('../../config/loggers/pinoLog');
const { mailer } = require('../../config/index');

console.log(mailer);
let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: mailer.mailer_user,
        pass: mailer.mailer_pass
    }
});

transporter.verify((error, success) => {
    if (error) {
        logger.info(error);
    } else {
        logger.info('Server is ready to take our messages');
    }
}

);


module.exports = transporter;