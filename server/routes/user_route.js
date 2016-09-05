var User = require('../controllers/user_controller.js');

module.exports = function(router){

  router.post('/users/login', User.login);

  router.use(User.authenticate);

  // router.post('/users/logout', User.logout);

  router.route('/users')
    .post(User.create)
    .get(User.get);

  router.route('/users/:user_id')
    .put(User.update)
    .get(User.find)
    .delete(User.remove);

}
