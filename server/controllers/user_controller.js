var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');

module.exports = {
  authenticate: function(req, res, next){

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token){
      jwt.verify(token, config.secret, function(err, decoded){
        if (err){
          res.json({success: false, message: 'Failed to authenticate token'});
        }else {
          req.decoded = decoded;
          console.log(decoded);
          next();
        }
      });
    } else{
      res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }
  },

  login: function(req, res){
    User.findOne({
      email: req.body.email
    }).select('email password').exec(function (err, user){
      if (err){
        res.json({success: false, message: 'Failed to log in, try again'});
      }
      if (!user) {
        res.json({success: false, message: 'Email does not exist'});
      }
      else if (user) {

        var validPassword = user.comparePassword(req.body.password);
        if(!validPassword) {
          res.json({
            success: false,
            message: 'Wrong message'
          });
        } else {
          var token = jwt.sign({
            _id: user._id,
            email: user.email
          }, config.secret, {
            expiresIn: '24h'
          });

          res.json({
            success: true,
            message: 'Enjoy your token',
            token: token
          });
        }
      }
    })
  },

  // logout: function(req, res){
  //   if(req.body.token || req.query.token || req.headers['x-access-token'])
  //     token = null;
  //     res.json({
  //       message: 'You are now logged out',
  //       token: token
  //     });
  //   res.json({message: 'You aren\'t logged in'});
  // },
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
