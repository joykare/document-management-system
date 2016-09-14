var Document = require('../models/document');
var User = require('../models/user');
var Role = require('../models/role');

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
  all: function(req, res){
    var limit = req.query.limit || req.headers['limit'];
    var skip = req.query.skip || req.headers['skip'];
    var date = req.query.date;
    var role = req.query.role;

    if (date){
      var start = date + 'T00:00:00Z';
      var end = date + 'T23:59:59Z';

      Document.find({
        $and : [{createdAt: {$gte: start, $lt: end}}]
      })
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 10)
      .sort('createdAt')
      .exec(function (err, documents){
        if (err){
          res.status(400).send({message: 'An error occured when finding your document'});
        }

        if (documents.length === 0) {
          res.status(409).send({message: 'No documents for this date'});
        }
        else {
          res.status(200).json(documents);
        }
      })
    } else if (role) {
      Role.findOne({ title: role }, function(err, role){
          User.find({ role: role._id }, function(err, users){
            users.forEach(function (user){
              Document.find({ ownerId: user._id }, function(err, documents){
                res.send(documents)
              })
            })
          })
        })
    } else {
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
    }
  },
  find: function(req, res){
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
  },

};
