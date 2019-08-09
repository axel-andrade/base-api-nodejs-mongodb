
const conf = require('config');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        const decoded = await promisify(jwt.verify)(token, conf.appId);
        req.userId = decoded.id;
        return next();
    } catch (e) {
        return res.status(401).json({ error: 'Token invalid' });
    }
}