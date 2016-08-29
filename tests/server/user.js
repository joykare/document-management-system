// var chai = require('chai');
// var assert = chai.assert;
//
// describe('unique', function() {
//   it('dummyTest', function() {
//     assert.equal(-1, [1,2,3].indexOf(4));
//   });
// });

var userRoute = require('../../server/routes/user_route.js');
var request = require('supertest')(userRoute);

describe('my cp3', function() {
  it('returns welcome message', function(done){
    request
      .get('/')
      .expect({message: 'Welcome to the home page!!'}, done);
  })
})

describe('/users CRUD operations', function() {
  it('creates a user in the db', function(done){
    request
      .post('/api/users')
      .send({
        username: 'lwarugu',
        first: 'lynn',
        last: 'warugu',
        password: 'lwarugu',
        email: 'lwarugu@gmail.com',
        id: 1
      })
      .expect({message: 'New user created'}, done);
  });
  it('returns all the users in the db', function(done){
    request
      .get('/api/users')
      .expect({})
  });
})

describe('/users/:user_id CRUD operations', function(){
  describe('get a user', function(){
    it('finds a user with matching id', function(done){
      request
        .get('/api/user/:user_id')
    });
    it('find a no-existent user', function(done){
      request
        .get('/api/user/:user_id')
    });
  })
  it('updates a particular user data', function(done){
    request
      .put('/api/user/:user_id')
  });
  it('deletes a particular user inforation', function(done){
    request
      .delete('/api/user/:user_id')
  });
})
