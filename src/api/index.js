const express = require('express');
const usersRouter = require('./routes/users');


const routes = express.Router();

routes.use('/api/users', usersRouter);

module.exports = routes;