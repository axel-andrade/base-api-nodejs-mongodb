'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');
const validate = require('express-validation');
const validators = require('../validators/User');
const handle = require('express-async-handler');

router.get('/:id', handle(controller.getById));
router.post('/register', validate(validators), handle(controller.register));
router.post('/login', handle(controller.login));
router.put('/update/:id', handle(controller.updateUser));
router.delete('/delete/:id', handle(controller.deleteUser));

module.exports = router;