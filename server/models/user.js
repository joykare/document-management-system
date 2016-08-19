var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  id: Number,
  username: String,
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true,
    }
  },
  email: String,
  password: String

});

var User = mongoose.model('User', userSchema);

module.exports = User;
