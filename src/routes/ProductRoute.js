'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductController');
const auth = require('../middlewares/auth');

router.get('/', auth, controller.get);
router.get('/:slug', auth, controller.getBySlug);
router.get('/admin/:id', auth, controller.getById);
router.get('/tags/:tag', auth, controller.getByTag);
router.post('/', auth, controller.post);
router.put('/:id', auth, controller.put);
router.delete('/:id', auth, controller.delete);


module.exports = router;