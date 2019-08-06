'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

class SessionController {

    async store(req, res) {

        console.log("body", req.body);

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            user.comparePassword(password, (error, match) => {
                if (!match) {
                    return res.status(400).send({ message: "The password is invalid" });
                }
            });

            let output = { user: user.toJSON() };
            output.user.token = User.generateToken(user.id);
            return res.json(output);
        } catch (error) {
            res.status(500).send(error);
        }
    };

}


module.exports = new SessionController();