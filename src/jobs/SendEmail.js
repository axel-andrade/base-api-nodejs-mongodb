const Mail = require('../services/email-service');

class SendMail {
    get key() {
        return "SendEmail";
    }

    async handle(job, done) {
        let { name, email, language } = job.data;
        language = language || "pt";
        await Mail.welcomeEmail(name, email, language);
        return done();
    }
}

module.exports = new SendMail();
