var Document = require('../models/document.js');

module.exports = {
  create: function(req, res){
    var document = new Document();

    document.ownerId = req.decoded._id;
    document.title = req.body.title;
    document.content = req.body.content;

    document.save(function(err){
      if(err){
        res.status(400).send({message: 'An error occured when saving your document'});
      }
      res.status(200).send({message: 'New document created'});
    });
  },
  get: function(req, res){
    Document.find(function(err, documents){
      if (err){
        res.status(400).send({message: 'An error occured when finding your document'});
      }
      res.status(200).json(documents);
    });
  },
  find: function(req, res){
    Document.findById(req.params.document_id, function(err, document){
      if (err){
        res.status(400).send({message: 'An error occured when finding your document'});
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
        if(document.ownerId)
          document.ownerId = req.decoded._id;
        if(document.title)
          document.title = req.body.title;
        if(document.content)
          document.content = req.body.content;

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
