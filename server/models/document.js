var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema ({
  ownerId: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  title: String,
  content: String,

},{ timestamps: {createdAt: 'createdAt', updatedAt: 'modifiedAt'}});

var Document = mongoose.model('Document', documentSchema);

module.exports = Document;
