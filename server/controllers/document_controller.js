var Document = require('../models/document');

module.exports = {
  create: function(req, res){
    var document = new Document();

    document.ownerId = req.decoded._id;
    document.title = req.body.title;
    document.content = req.body.content;
    if(req.body.accessLevel) {document.accessLevel = req.body.accessLevel}

    document.save(function(err){
      if(err){
        if(err.code === 11000){
          res.status(409).send({message: 'Duplicate entry'})
        } else {
          res.status(400).send({message: 'Error occured while saving the document'});
        }
      }
      res.status(200).send({message: 'New document created'});
    });
  },
  getAll: function(req, res){
    var limit = req.query.limit || req.headers['limit'];
    var skip = req.query.skip || req.headers['skip'];

    Document.find({ 
        $or : [{ownerId: req.decoded._id}, {accessLevel: 'public'}]
      })
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 10)
      .sort('createdAt')
      .exec(function (err, documents){
        if (err){
          res.status(400).send({message: 'An error occured when finding your document'});
        }

        if (documents.length === 0) {
          res.status(409).send({message: 'No documents for user'});
        }
        else {
          res.status(200).json(documents);
        }
      })
  },
  findOne: function(req, res){
    Document.findById(req.params.document_id, function(err, document){
      if (err){
        res.status(400).send({message: 'An error occured when finding your document'});
      }
      if (!document) {
        res.status(409).send({message: 'Document not found'});
      }
      res.status(200).json(document);
    });
  },
  update: function(req, res){
    Document.findById(req.params.document_id, function(err, document){
      if (err){
        res.status(400).send({message: 'An error occured when finding your document'});
      }
      else {
        if(req.body.title)
          document.title = req.body.title;
        if(req.body.content)
          document.content = req.body.content;
        if(req.body.accessLevel)
          document.accessLevel = req.body.accessLevel;

        document.save(function(err){
          if (err){
            res.status(400).send({message: 'An error occured when saving your document'});
          }
          res.status(200).send({message: 'Document has been updated'});
        });
      }
    });
  },
  remove: function(req, res){
    Document.remove(
      {_id: req.params.document_id}, function(err){
        if (err){
          res.status(400).send({message: 'An error occured when deleting your document'});
        }
        res.status(200).send({message: 'Document has been deleted'});
      });
  }
};
