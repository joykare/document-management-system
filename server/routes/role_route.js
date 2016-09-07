var Role = require('../controllers/role_controller');

module.exports = function(router){

  router.route('/roles')
    .post(Role.create);
}
