'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller.js');

router.get('/:id', controller.getById);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.put('/update/:id', controller.updateUser);
router.delete('/delete/:id', controller.deleteUser);

module.exports = router;