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

mongoose.createConnection(config.dev_database, function(err){
  if (err){
    console.log('Database connection error: ', err);
  }else {
    console.log('Dev database connected successfully');
  }
});

app.listen(config.port);

module.exports = app;
