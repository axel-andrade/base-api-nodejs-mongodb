'use strict'
const mongoose = require('mongoose');
const Product = mongoose.model('Product');


exports.create = async (data) => {
    let product = new Product(data);
    return await product.save();
}

exports.get = async (filters, limit, page, fields) => {
    /*populate: ['author'], sort: '-createdAt' */
    //return await Product.paginate({ active: true }, { page: page, limit: limit, select: fields });
    return await Product.paginate(filters, { page: page, limit: limit, select: fields });
};

exports.getByTag = async (limit, page, tag, fields) => {
    return await Product.paginate({
        active: true,
        tags: tag
    }, { page, limit, select: fields });
}

exports.getById = async id => {
    return await Product.findById(id);
}

exports.getBySlug = async (slug, fields) => {
    return await Product.paginate({
        active: true,
        tags: slug
    }, { page, limit, select: fields });

};

exports.put = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
    return await Product.findByIdAndRemove(id);
};