var mongoose = require('mongoose');
var User = require('../models/user.js');

mongoose.connect('mongodb://localhost/cp3');

module.exports = {
  create: function(req, res){
    var user = new User();
    user.id = req.body.id;
    user.username = req.body.username;
    user.name = {first: req.body.first, last: req.body.last};
    user.email = req.body.email;
    user.password= req.body.password;

    user.save(function (err){
      if (err){
        res.send(err);
      }
      res.json({message: 'New user created'});
    });
  },
  get: function(req, res){
    User.find(function(err, users){
      if(err){
        res.send(err);
      }
      res.json(users);
    });
  },
  update: function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if (err){
        res.send(err);
      }
      else{
        user.id = req.body.id;
        user.username = req.body.username;
        user.name = {first: req.body.first, last: req.body.last};
        user.email = req.body.email;
        user.password= req.body.password;

        user.save(function(err){
          if (err){
            res.send(err);
          }
          res.json({message: 'User has been updated'});
        });
      }
    });
  },
  find: function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if (err){
        res.send(err);
      }
      res.json(user);

    });
  },
  remove: function(req, res){
    User.remove(
      {_id: req.params.user_id}, function(err){
        if (err){
          res.send(err);
        }
        res.json({message: 'User has been deleted'});
      });
  }
};
