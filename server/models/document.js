var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema ({
  id: Number,
  ownerId: Number,
  title: String,
  content: String,
  createdAt: String,
  modifiedAt: String”

});

var Document = mongoose.model('Document', userSchema);

var document1 = new Document({
  id: 1,
  ownerId: 2,
  title: 'I need to do X',
  content: 'Some content',
  createdAt: '2015-08-12 11:57:23',
  modifiedAt: '2015-08-12 11:57:23'
});

document1.save(function(err, document1) {
  if (err) return console.error(err);
  console.dir(document1);
});


module.exports = Document;
