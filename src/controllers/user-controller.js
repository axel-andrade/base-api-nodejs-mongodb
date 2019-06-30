'use strict';

const Messages = require('../../locales/Messages');
const repository = require('../repositories/user-repository');
const Mail = require('../services/email-service.js');


exports.getById = async (req, res, next) => {
    try {
        let product = repository.getById(req.params.id);
        res.status(201).send(product);
    } catch (e) {
        res.status(400).send(e);
    };

};

exports.post = async (req, res, next) => {
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
        res.status(201).send({ objectId: user.id });
    } catch (e) {
        res.status(400).send(e);
    };

};

exports.put = async (req, res, next) => {
    try {
        let user = await repository.put(req.params.id, req.body);
        res.status(201).send({ message: Messages(null).success.EDITED_SUCCESS });
    } catch (e) {
        res.status(400).send(e);
    };
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(201).send({ message: Messages(null).success.DELETED_SUCCESS });
    } catch (e) {
        res.status(400).send(e);
    };

};
