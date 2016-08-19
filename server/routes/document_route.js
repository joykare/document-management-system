var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Document = require('../controllers/document_controller.js');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port =process.env.PORT || 8080;
var router = express.Router();

router.route('/documents')
  .post(Document.create)
  .get(Document.get);

router.route('/documents/:document_id')
  .get(Document.find)
  .put(Document.update)
  .delete(Document.remove);

app.use('/api', router);

app.listen(port);
