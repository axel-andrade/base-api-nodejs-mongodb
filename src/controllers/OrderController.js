'use strict';
const Messages = require('../../locales');
const repository = require('../repositories/OrderRepository');
const Mail = require('../services/email-service.js');

class OrderController {

    async get(req, res, next) {
        let limit = parseInt(req.query.limit) || 10000;
        let page = parseInt(req.query.page) || 1;

        try {
            let orders = await repository.get(limit, page, req.body.fields);
            res.status(200).send(orders);
        } catch (e) {
            res.status(400).send(e);
        }
    };

    async getById(req, res, next) {
        try {
            let order = repository.getById(req.params.id);
            res.status(201).send(product);
        } catch (e) {
            res.status(400).send(e);
        };

    };

    async create(req, res, next) {

        try {
            let order = await repository.create(req.body);
            res.status(201).send({ objectId: order.id });
        } catch (e) {
            res.status(400).send(e);
        };

    };

    async put(req, res, next) {

        let data = req.body;
        try {
            let order = await repository.put(req.params.id, data);
            res.status(201).send({ message: Messages(null).success.EDITED_SUCCESS });
        } catch (e) {
            res.status(400).send(e);
        };
    };

    async delete(req, res, next) {
        try {
            await repository.delete(req.params.id);
            res.status(201).send({ message: Messages(null).success.DELETED_SUCCESS });
        } catch (e) {
            res.status(400).send(e);
        };

    };
}

module.exports = new OrderController();