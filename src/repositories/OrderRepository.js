'use strict'
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.create = async (data) => {
    let order = new Order(data);
    return await order.save();
}

exports.get = async (limit, page, fields) => {
    return await Order.paginate({ page: page, limit: limit, select: fields });
};

exports.getById = async id => {
    return await Order.findById(id);
}

exports.put = async (id, data) => {
    return await Order.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
    return await Order.findByIdAndRemove(id);
};