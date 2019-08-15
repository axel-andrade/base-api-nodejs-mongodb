const kue = require('kue');
const conf = require('config');
const SendEmail = require('../jobs/SendEmail');

const Queue = kue.createQueue({ redis: conf.redis });
Queue.process(SendEmail.key, SendEmail.handle);
module.exports = Queue; 