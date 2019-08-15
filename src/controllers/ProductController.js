'use strict';

const Messages = require('../../locales');
const repository = require('../repositories/ProductRepository');

class ProductController {
    async get(req, res, next) {
        let limit = parseInt(req.query.limit) || 10000;
        let page = parseInt(req.query.page) || 1;
        let filters = {};
        let { min, max, title } = req.query;

        if (min)
            filters.price.$gte = min;
        if (max)
            filters.price.$gte = min;
        if (title)
            filters.title = new RegExp(title, i);
        filters.active = true;

        try {
            let products = await repository.get(filters, limit, page, req.body.fields);
            res.status(200).send(products);
        } catch (e) {
            res.status(400).send(e);
        }
    };

    async getByTag(req, res, next) {
        let _params = req.body;
        let limit = _params.limit || 10000;
        let page = _params.page || 0;

        try {
            let products = await repository.getByTag(limit, page, req.params.tag, req.body.fields);
            res.status(200).send(products);
        } catch (e) {
            res.status(400).send(e);
        };

    };

    async getBySlug(req, res, next) {
        try {
            let products = await repository.getBySlug(req.params.slug, req.body.fields);
            res.status(201).send(products);
        } catch (e) {
            res.status(400).send(e);
        };

    };

    async getById(req, res, next) {
        try {
            let product = repository.getById(req.params.id);
            res.status(201).send(product);
        } catch (e) {
            res.status(400).send(e);
        };

    };

    async post(req, res, next) {

        // let contract = new ValidationContract();
        // contract.hasMinLen(req.body.title, 3, "O titulo deve conter no mínimo 3 caracteres");
        // //se os dados forem invalidos
        // if (!contract.isValid()) {
        //     res.status(400).send(contract.errors()).end();
        //     return;
        // }

        try {
            let product = await repository.create(req.body);
            res.status(201).send({ objectId: product.id });
        } catch (e) {
            res.status(400).send(e);
        };

    };

    async put(req, res, next) {

        let data = req.body;
        try {
            let product = await repository.put(req.params.id, data);
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

module.exports = new ProductController();