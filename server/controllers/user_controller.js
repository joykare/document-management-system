var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var superSecret = 'whatwhatwhatwhatwhat';

mongoose.connect('mongodb://localhost/cp3');

module.exports = {
  authenticate: function(req, res, next){
    // check header/url/post params for tokens
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      // verifies secret
      jwt.verify(token, superSecret, function(err, decoded){
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token'
          });
        } else {
          // if everything is good save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }
  },
  login: function(req, res){
    User.findOne({
      email: req.body.email
    }).select('email password').exec(function(err, user){
      if (err)
        throw err;
      // no user with the email
      if (!user){
        res.json({
          success: false,
          message: 'Authentication failed. User not found'
        });
      }
      else if (user){
        // check if password matches
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword){
          res.json ({
            success: false,
            message: 'Wrong password'
          });
        } else {
          // if password is valid create token
          var token = jwt.sign ({
            email: user.email,
            id: user.id
          }, superSecret, {
            expiresIn: 1440
          });

          // return a message
          res.json ({
            success: true,
            message: 'You are logged in successfully. Token valid for 24 hrs!!',
            token: token
          });
        }
      }
    });
  },
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
