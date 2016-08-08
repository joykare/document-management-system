var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema ({
  id: Number,
  title: String”
});

var Role = mongoose.model('Role', userSchema);

var role1 = new Role({
  id: 1,
  title: 'I need to do X'
});

role1.save(function(err, role1) {
  if (err) return console.error(err);
  console.dir(role1);
});


module.exports = Role;
