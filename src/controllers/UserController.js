'use strict';

const Messages = require('../../locales');
const repository = require('../repositories/UserRepository');
const Mail = require('../services/email-service.js');

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
            Mail.welcomeEmail(req.body.name, req.body.email, null);
            res.status(201).send(user);
        } catch (e) {
            res.status(400).send(e);
        };

    };

    async login(req, res) {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            user.comparePassword(req.body.password, (error, match) => {
                if (!match) {
                    return res.status(400).send({ message: "The password is invalid" });
                }
            });
            res.status(201).send({ message: "The username and password combination is correct!" });
        } catch (error) {
            res.status(500).send(error);
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