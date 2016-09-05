var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema ({
  id: Number,
  ownerId: Number,
  title: String,
  content: String,
  createdAt: Date,
  modifiedAt: Date

});

var Document = mongoose.model('Document', documentSchema);

module.exports = Document;
