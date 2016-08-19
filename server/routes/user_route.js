var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = require('../controllers/user_controller.js');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port =process.env.PORT || 8080;
var router = express.Router();

router.route('/users')
  .post(User.create)
  .get(User.get);

router.route('/users/:user_id')
  .put(User.update)
  .get(User.find)
  .delete(User.remove);

app.use('/api', router);

app.listen(port);
