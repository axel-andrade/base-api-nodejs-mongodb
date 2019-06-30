'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const conf = require('config');

const app = express();
const router = express.Router();

mongoose.connect(conf.databaseUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//carregando models
const Product = require('./models/product');
const User = require('./models/user');

//carregando rotas
const index = require('./routes/index-route.js');
const productRoutes = require('./routes/product-route.js');
const userRoutes = require('./routes/user-route.js');


//configurando para utilizar o body parser para converter para formato json
//app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

//definindo as rotas
app.use('/', index);
app.use('/products', productRoutes);
app.use('/user', userRoutes);


module.exports = app;