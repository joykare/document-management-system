var app = require('../index');
var request = require('supertest')(app);

describe('user test suite', function() {
  var token;

  beforeEach(function(done){
    request
      .post('/api/users/login')
      .send({
        email: 'jwarugu@gmail.com',
        password: 'jwarugu'
      })
      .end(function(err, res){
        if (err) return done(err);
        token = res.body.token;
        done();
      })
  });

  describe('/users CRUD operations', function() {
    it('creates a user in the db', function(done){
      request
        .post('/api/users')
        .set('x-access-token', token)
        .send({
          username: 'user',
          first: 'first',
          last: 'last',
          email: 'user@gmail.com',
          password: 'user'
        })
        .expect(200)
        .expect({message: 'New user created'}, done);
    });
    it('asserts that no duplicates can be created', function(done){
      request
        .post('/api/users')
        .set('x-access-token', token)
        .send({
          username: 'user',
          first: 'first',
          last: 'last',
          email: 'user@gmail.com',
          password: 'user'
        })
        .expect(409)
        .expect({message: 'Duplicate entry'}, done);
    });
  })
})



// describe('/users/:user_id CRUD operations', function(){
//   describe('get a user', function(){
//     it('finds a user with matching id', function(done){
//       request
//         .get('/api/user/:user_id')
//     });
//     it('find a non-existent user', function(done){
//       request
//         .get('/api/user/:user_id')
//     });
//   })
//   it('updates a particular user data', function(done){
//     request
//       .put('/api/user/:user_id')
//   });
//   it('deletes a particular user inforation', function(done){
//     request
//       .delete('/api/user/:user_id')
//   });
// })
