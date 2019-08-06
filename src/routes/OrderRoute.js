'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrderController');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/create', controller.create);
router.put('/update/:id', controller.put);
router.delete('/delete/:id', controller.delete);

module.exports = router;