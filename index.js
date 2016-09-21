var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  config = require('./config/config'),
  routes = require('./server/routes'),
  router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes(router));

mongoose.connect(config.test_database, function(err){
  if (err){
    console.log('Database connection error: ', err);
  }else {
    console.log('Database connected successfully');
  }
});

app.listen(config.port,  function(err){
  if (err){
    console.log('Port not reached: ', err);
  } else {
    console.log('Magic port right here');
  }
});

module.exports = app;
