var mongoose = require('mongoose');
var User = require('../models/user.js');

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
      console.log('ID:', req.decoded);
      if (err){
        res.send(err);
      }
      else{
        if (req.body.id)
          user.id = req.body.id;
        if (req.body.username)
          user.username = req.body.username;
        if (req.body.first || req.body.last)
          user.name = {first: req.body.first, last: req.body.last};
        if (req.body.email)
          user.email = req.body.email;
        if (req.body.password)
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
