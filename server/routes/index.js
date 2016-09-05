var userRoute = require('./user_route'),
  User = require('../models/user.js'),
  documentRoute = require('./document_route'),
  jwt = require('jsonwebtoken'),
  config = require('../../config/config.js');

module.exports = function(router){

  router.post('/users/login', function(req, res){

    User.findOne({ email: req.body.email})
      .select('email password')
      .exec(function (err, user){
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
  });

  router.use('/authenticate', function(req, res, next){

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
  });

  userRoute(router);
  documentRoute(router);

  return router;
}
