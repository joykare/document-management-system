var Role = require('../controllers/role_controller');

module.exports = function (router) {
  router.route('/roles')
    .get(Role.get)
    .post(Role.create);
};
