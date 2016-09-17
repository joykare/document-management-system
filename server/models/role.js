var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema ({
  title: {
    type: String,
    required: true,
    enum: ['superadmin', 'admin', 'user']
  }
});

module.exports = mongoose.model('Role', roleSchema);
