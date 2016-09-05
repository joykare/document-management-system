var mongoose = require('mongoose');
var seed = require('./seed.js');
var config = require('../config/config.js');
var User = require('../server/models/user.js')

mongoose.connect(config.test_database, function(err){
  if(err) {
    console.log('error: ', err);
  }
});

mongoose.connection.on('connected', function(err){
  User.create(seed.users, function(err){
    if (err) {
      console.log('error: ', err );
    }
    process.exit();
  })
})
