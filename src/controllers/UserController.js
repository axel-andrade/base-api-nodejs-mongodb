'use strict';

const Messages = require('../../locales');
const repository = require('../repositories/UserRepository');
const Mail = require('../services/email-service.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Queue = require('../services/Queue');

class UserController {
    async getById(req, res) {
        try {
            let product = repository.getById(req.params.id);
            res.status(201).send(product);
        } catch (e) {
            res.status(400).send(e);
        };

    };

    async register(req, res) {

        try {
            let user = await repository.create(req.body);
            let { name, email } = req.body;
            //Mail.welcomeEmail(req.body.name, req.body.email, null);
            Queue.create("SendEmail", {
                name, email, language: null
            }).save();

            res.status(201).send(user);
        } catch (e) {
            res.status(400).send(e);
        };

    };

    async login(req, res) {
        try {
            console.log("body", req.body);
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            await user.comparePassword(password, (error, match) => {
                if (!match) {
                    return res.status(400).send({ message: "The password is invalid" });
                }
            });
            let output = { user: user.toJSON() };
            output.user.token = User.generateToken(user.id);
            return res.status(201).send(output);
        } catch (error) {
            res.status(400).send({ code: 101, error: 'Object not found' });
        }
    };

    async updateUser(req, res) {
        try {
            let user = await repository.put(req.params.id, req.body);
            res.status(201).send({ message: Messages(null).success.EDITED_SUCCESS });
        } catch (e) {
            res.status(400).send(e);
        };
    };

    async deleteUser(req, res) {
        try {
            await repository.delete(req.params.id);
            res.status(201).send({ message: Messages(null).success.DELETED_SUCCESS });
        } catch (e) {
            res.status(400).send(e);
        };

    };

}


module.exports = new UserController();