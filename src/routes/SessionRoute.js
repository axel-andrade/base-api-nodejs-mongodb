'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/SessionController');

router.post('/sessions', controller.store);

module.exports = router;