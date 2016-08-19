var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema ({
  id: Number,
  ownerId: Number,
  title: String,
  content: String,
  createdAt: String,
  modifiedAt: String

});

var Document = mongoose.model('Document', documentSchema);

module.exports = Document;
