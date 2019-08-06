const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conf = require('config');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    isFacebook: {
        type: Boolean,
        required: false,
        default: false
    },
    isGoogle: {
        type: Boolean,
        required: false,
        default: false
    },
});

//methods 
UserSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

//before save
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.statics = {
    generateToken(id) {
        return jwt.sign({ id }, conf.appId, {
            expiresIn: conf.tokenExpirationTime
        });
    }
}

UserSchema.set('timestamps', true);

module.exports = mongoose.model("User", UserSchema);