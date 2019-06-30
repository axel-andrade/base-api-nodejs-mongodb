'use strict';
const Messages = require('../../locales/Messages');
const conf = require('config');
var fs = require('fs');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(conf.sendgridKey);

const readFile = (file, data) => new Promise((resolve, reject) => {
    fs.readFile(file, (err, htmlBody) => {
        if (err)
            reject(err);
        else {
            console.log("err", err)
            htmlBody = String(htmlBody);
            for (var key in data) {
                htmlBody = htmlBody.replace("{{" + key + "}}", data[key]);
            }
            resolve(htmlBody);
        }
    });
});
var Mail = {
    sendEmail: function (to, subject, body) {
        sendgrid.send({
            to: to,
            from: "contato@baseapi.com.br",
            subject: subject,
            text: 'Teste',
            html: body
        });
    },
    sendMime: async (file, toAddress, title, data) => {
        console.log("->>sendMime")
        var filepath = './mails/' + file + ".html";
        try {
            let htmlBody = await readFile(filepath, data)
            Mail.sendEmail(toAddress, title, htmlBody);
        } catch (e) {
            console.log(e);
        }
    },
    welcomeEmail: function (name, email, language) {
        language = language || "pt";
        console.log("->>welcomeEmail")
        return Mail.sendMime("welcome/" + language, email, Messages(language).email.WELCOME, { name: name });
    },
    recoverPassword: function (name, email, url, language) {
        language = language || "pt";
        console.log("->>recoverPassword");
        console.log(url);
        return Mail.sendMime("recover-password/" + language, email, Messages(language).email.RECOVER, { name: name, url: url });
    },
    addCustomFields: function (data) {
        data = data || {};
        data.appName = conf.appName;
        data.colorBG = conf.colorBG;
        data.logoImage = conf.logoImage;
        data.termosDeUso = conf.termosDeUso;
        data.termosDeUsoBroker = conf.termosDeUsoBroker;
        return data;
    },
    sendTemplateEmail: function (email, htmlFile, data, subject) {
        let _base;
        data = Mail.addCustomFields(data);
        return utils.readHtml("base", data).then(function (base) {
            _base = base;
            return htmlFile ? utils.readHtml(htmlFile, data) : Promise.resolve(base)
        }).then(function (html) {
            _base = _base.replace("{{body}}", html);
            if (htmlFile == "welcome") _base = _base.replace(/\{{landingPage}}/g, conf.landingPage).replace(/\{{appName}}/g, conf.appName);

            return Mail.sendEmail(email, subject, _base);
        });
    }



};

module.exports = Mail;