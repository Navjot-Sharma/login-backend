const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./api/index');
const cors = require('cors');

const app = express();

const db = 'mongodb://localhost/login';

mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/', routes);


mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true })
 .then( ()=> console.log('Connected to mongodb...'))
 .catch( (error) => console.log('Connection failed', error));

 app.listen(3100, (err) => {
  if (err) {
    console.error('process error', err);
    process.exit(1);
  }
  console.log('Server listening on port: 3100');

});

module.exports = app;
