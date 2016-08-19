var Document = require('../models/document.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cp3');

module.exports = {
  create: function(req, res){
    var document = new Document();
    document.id = req.body.id;
    document.ownerId = req.body.ownerId;
    document.title = req.body.title;
    document.content = req.body.content;
    document.createdAt = req.body.createdAt;
    document.modifiedAt = req.body.modifiedAt;

    document.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message: 'New document created'});
    });
  },
  get: function(req, res){
    Document.find(function(err, documents){
      if (err){
        res.send(err);
      }
      res.json(documents);
    });
  },
  find: function(req, res){
    Document.findById(req.params.document_id, function(err, document){
      if (err){
        res.send(err);
      }
      res.json(document);
    });
  },
  update: function(req, res){
    Document.findById(req.params.document_id, function(err, document){
      if (err){
        res.send(err);
      }
      else {
        document.id = req.body.id;
        document.ownerId = req.body.ownerId;
        document.title = req.body.title;
        document.content = req.body.content;
        document.createdAt = req.body.createdAt;
        document.modifiedAt = req.body.modifiedAt;

        document.save(function(err){
          if (err){
            res.send(err);
          }
          res.json({message: 'Document has been updated'});
        });
      }
    });
  },
  remove: function(req, res){
    Document.remove(
      {_id: req.params.document_id}, function(err){
        if (err){
          res.send(err);
        }
        res.json({message: 'Document has been deleted'});
      });
  }
};
