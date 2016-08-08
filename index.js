var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./server/models/user.js');

mongoose.connect('mongodb://localhost/cp3');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port =process.env.PORT || 8080;
var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something\'s happening!!' );
  next();
});

router.post('/users/login', function(req,res){
  res.json({message: 'You are now logged in:'});
});

router.post('/users/logout', function(req,res){
  res.json({message: 'Bye bye'});
});

router.route('/users')
  .post(function(req, res){
    var user = new User();
    user.id = req.body.id;
    user.username = req.body.username;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password= req.body.password;

    user.save(function (err){
      if (err){
        res.send(err);
      }
      res.json({message: 'New user created'});
    });
  })
  .get(function(req, res){
    User.find(function(err, users){
      if(err){
        res.send(err);
      }
      res.json(users);
    });
  });

router.route('/users/:user_id')
  .put(function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if (err){
        res.send(err);
      }
      else{
        user.id = req.body.id;
        user.username = req.body.username;
        user.name = req.body.name;
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
  })

  .get(function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if (err){
        res.send(err);
      }
      res.json(user);

    });
  })

  .delete(function(req, res){
    User.remove(
      {_id: req.params.user_id}, function(err){
        if (err){
          res.send(err);
        }
        res.json({message: 'User has been deleted'});
      });
  });
app.use('/cp3', router);

app.listen(port);
console.log('Its working: go to localhost ' + port);
