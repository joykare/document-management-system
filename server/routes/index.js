var userRoute = require('./user_route'),
  User = require('../models/user'),
  documentRoute = require('./document_route'),
  roleRoute = require('./role_route'),
  jwt = require('jsonwebtoken'),
  config = require('../../config/config');

module.exports = function (router) {
  router.post('/users/login', function (req, res) {
    User.findOne( {email: req.body.email} )
      .select('email password role')
      .exec(function (err, user) {
        if (err) {
          res.status(400).send({ message: 'Failed to log in, try again' });
        }
        if (!user) {
          res.status(401).send({ message: 'Email does not exist' });
        }
        else if (user) {
          var validPassword = user.comparePassword(req.body.password);

          if(!validPassword) {
            res.status(401).send({ message: 'Wrong password' });
          } else {
            var token = jwt.sign({
              _id: user._id,
              email: user.email,
              role: user.role
            }, config.secret, {
              expiresIn: '24h'
            });

            res.status(200).send({
              message: 'Enjoy your token',
              token: token
            });
          }
        }
      });
  });

  router.use(function (req, res, next) {

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
  });

  userRoute(router);
  documentRoute(router);
  roleRoute(router);

  return router;
};
