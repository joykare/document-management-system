var User = require('./user.js');

var user1 = new User({
  id: 1,
  username: 'njerry',
  name: {
    first: 'Njeri',
    last: 'Kieha'
  },
  email: 'njerry@werry.kieha',
  password: 'password'
});

module.exports = user1;
