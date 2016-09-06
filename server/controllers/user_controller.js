var mongoose = require('mongoose');
var User = require('../models/user.js');

module.exports = {

  create: function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.name = {first: req.body.first, last: req.body.last};
    user.email = req.body.email;
    user.password= req.body.password;

    user.save(function (err){
      if (err){
        res.status(400).send({message: 'Error occured during save.'});
      }
      res.status(200).send({message: 'New user created'});
    });
  },
  get: function(req, res){
    User.find(function(err, users){
      if(err){
        res.status(400).send({message: 'Error occured while accessing the user.'});
      }
      res.status(200).json(users);
    });
  },
  update: function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if (err){
        res.status(400).send({message: 'Error occured while accessing the user.'});
      }
      else{
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
            res.status(400).send({message: 'Error occured while saving the user.'});
          }
          res.status(200).send({message: 'User has been updated'});
        });
      }
    });
  },
  find: function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if (err){
        res.status(400).send({message: 'Error occured while accessing the user.'});
      }
      res.status(200).json(user);

    });
  },
  remove: function(req, res){
    User.remove(
      {_id: req.params.user_id}, function(err){
        if (err){
          res.status(400).send({message: 'Error occured while accessing the user.'});
        }
        res.status(200).send({message: 'User has been deleted'});
      });
  }
};
