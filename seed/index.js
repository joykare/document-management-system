var mongoose = require('mongoose');
var seed = require('./seed');
var config = require('../config/config');
var User = require('../server/models/user');
var Role = require('../server/models/role')

mongoose.connect(config.test_database, function(err){
  if(err) {
    console.log('error: ', err);
  }
});

mongoose.connection.on('connected', function(err){
  User.create(seed.users, function(err){
    if (err) {
      console.log('error: ', err );
    }else {
      console.log('Users added successfully');
    }
    process.exit();
  });

  Role.create(seed.roles, function(err){
    if (err) {
      console.log('error: ', err );
    } else {
      console.log('Roles added successfully');
    }
  });
});
