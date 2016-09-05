var mongoose = require('mongoose');
var config = require('../config/config.js');

mongoose.dropDatabase(config.test_database);
