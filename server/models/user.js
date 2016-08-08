var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  id: Number,
  username: String,
  name: {
    type: String
  },
  email: String,
  password: String

});

var User = mongoose.model('User', userSchema);

var user1 = new User({
  id: 1,
  username: 'abc',
  // name: {
  // 	// first: 'John',
  // 	last: 'Snow'
  // },
  name: 'John Snow',
  email: 'a@b.c',
  password: 'pass'
});

user1.save(function(err, user1) {
  if (err) return console.error(err);
  console.dir(user1);
});


module.exports = User;
