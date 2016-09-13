var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var documentSchema = new Schema ({
  ownerId: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  accessLevel: {
    type: String,
    required: true,
    default: 'public'
  },
  content: String,

},{ timestamps: {createdAt: 'createdAt', updatedAt: 'modifiedAt'}});

documentSchema.plugin(mongoosePaginate);
var Document = mongoose.model('Document', documentSchema);

module.exports = Document;
