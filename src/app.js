'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const validate = require('express-validation');
const Youch = require('youch');
const conf = require('config');

const app = express();
const router = express.Router();

mongoose.connect(conf.databaseUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//carregando models
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

//carregando rotas
const index = require('./routes');
const sessionRoutes = require('./routes/SessionRoute');
const productRoutes = require('./routes/ProductRoute');
const userRoutes = require('./routes/UserRoute');
const orderRoutes = require('./routes/OrderRoute');


//configurando para utilizar o body parser para converter para formato json
//app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

//definindo as rotas
app.use('/', index);
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/', sessionRoutes);

//configurando exception handling
app.use(async (err, req, res, next) => {
    if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
    }

    if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err);
        return res.json(await youch.toJSON());
    }

    return res.status(err.status || 500).json({ error: "Internal server error" })
});

module.exports = app;