'use strict';

const Messages = require('../../locales/Messages');
const repository = require('../repositories/user-repository');
const Mail = require('../services/email-service.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getById = async (req, res, next) => {
    try {
        let product = repository.getById(req.params.id);
        res.status(201).send(product);
    } catch (e) {
        res.status(400).send(e);
    };

};

exports.register = async (req, res, next) => {
    // let contract = new ValidationContract();
    // contract.hasMinLen(req.body.title, 3, "O titulo deve conter no mínimo 3 caracteres");
    // //se os dados forem invalidos
    // if (!contract.isValid()) {
    //     res.status(400).send(contract.errors()).end();
    //     return;
    // }

    try {
        let user = await repository.create(req.body);
        Mail.welcomeEmail(req.body.name, req.body.email, null);
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    };

};

exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        user.comparePassword(req.body.password, (error, match) => {
            if(!match) {
                return res.status(400).send({ message: "The password is invalid" });
            }
        });
        res.status(201).send({ message: "The username and password combination is correct!" });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        let user = await repository.put(req.params.id, req.body);
        res.status(201).send({ message: Messages(null).success.EDITED_SUCCESS });
    } catch (e) {
        res.status(400).send(e);
    };
};

exports.deleteUser = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(201).send({ message: Messages(null).success.DELETED_SUCCESS });
    } catch (e) {
        res.status(400).send(e);
    };

};
