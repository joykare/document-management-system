var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema ({
  title: {
    type: String,
    required: true,
    enum: ['superadmin', 'admin', 'user']
  }
});

var Role = mongoose.model('Role', roleSchema);

module.exports = Role;
