var user = require('./user_route');
var document = require('./document_route')
module.exports = function(router){

    user(router);
    document(router);
    return router;

}
