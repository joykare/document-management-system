var Document = require('../controllers/document_controller.js');

module.exports = function(router) {

  router.route('/documents')
    .post(Document.create)
    .get(Document.get);

  router.route('/documents/:document_id')
    .get(Document.find)
    .put(Document.update)
    .delete(Document.remove);

}
