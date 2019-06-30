'use strict'
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.create = async (data) => {
    let user = new User(data);
    return await user.save();
}

exports.getById = async id => {
    return await User.findById(id);
}

exports.put = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
    return await User.findByIdAndRemove(id);
};