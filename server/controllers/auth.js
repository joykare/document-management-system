var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var Role = require('../models/role');

module.exports = {
  auth: function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          res.status(400).send({ message: 'Failed to authenticate token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({ message: 'No token provided' });
    }
  },

  accessAuth: function (req, res, next) {
    Role.findOne({_id: req.decoded.role}, function(err, role){
      if (role.title === 'admin') {
        next();
      } else {
        res.send({message: 'You are not authorized to make such changes'});
      }
    });
  }
};
