var app = require('../index');
var request = require('supertest')(app);
var expect = require('chai').expect;
var User = require('../server/models/user');

describe('user test suite', function() {
  var token;
  var userId;

  before(function(done){
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
    it('route that returns all users', function(done){
      request
        .get('/api/users')
        .set('x-access-token', token)
        .expect(200)
        .end(function (err, res){
          if (err) return done(err);
          expect(res.body).to.have.length(4);
          expect(Array.isArray(res.body)).to.equal(true);
          userId = res.body[0]._id;
          done();
        });
    });

    it('creates a user in the db', function(done){
      request
        .post('/api/users')
        .set('x-access-token', token)
        .send({
          username: 'user',
          first: 'first',
          last: 'last',
          email: 'user@gmail.com',
          password: 'user',
          role: 'user'
        })
        .expect(200)
        .expect({message: 'New user created'}, done)
    });

    it('asserts that no duplicates can be created', function(done){
      var username = User.schema.paths.username;
      var email = User.schema.paths.email;

      expect(username.options.index.unique).to.equal(true);
      expect(email.options.index.unique).to.equal(true);

      request
        .post('/api/users')
        .set('x-access-token', token)
        .send({
          username: 'user',
          first: 'first',
          last: 'last',
          email: 'user@gmail.com',
          password: 'user',
          role: 'user'
        })
        .expect(409)
        .expect({message: 'Duplicate entry'}, done);
    });

    it('asserts that last and first names are required', function(done){
      request
        .post('/api/users')
        .set('x-access-token', token)
        .send({
          username: 'test',
          email: 'test@gmail.com',
          password: 'test',
          role: 'user'
        })
        .expect(400)
        .expect({message: 'Error occured while saving the user'}, done);
    });

    it('asserts that a new user has a role defined', function(done){
      var role = User.schema.paths.role;
      expect(role.options.required).to.equal(true);
      done();
    });

    it('asserts that a role does not exist is flagged', function(done){
      request
        .post('/api/users')
        .set('x-access-token', token)
        .send({
          username: 'user',
          first: 'first',
          last: 'last',
          email: 'user@gmail.com',
          password: 'user',
          role: 'viewer'
        })
        .expect({message: 'No such role exists'}, done);
    });
  });

  describe('/users/:user_id CRUD operations', function(){
    it('finds a user with matching id', function(done){
      request
        .get('/api/users/' + userId)
        .set('x-access-token', token)
        .expect(200)
        .end(function(err, res){
          expect(res.body).to.exist;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('_id', 'email', 'username', 'name', 'role', '__v');
          done();
        });
    });

    it('find a non-existent user', function(done){
      request
        .get('/api/users/57d11f35b0a303c1234569df')
        .set('x-access-token', token)
        .expect(404)
        .expect({message: 'User not found'}, done);
    });

    it('updates a particular user data', function(done){
      request
        .put('/api/users/' + userId)
        .set('x-access-token', token)
        .send({
          username: 'njerry-werry',
          first: 'njerry',
          last: 'werry',
          password: 'njeri',
          email: 'njeri@gmail.com'
        })
        .end(function (err, res){
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User has been updated');
          done();
        });
    });

    it('updating a user that doesnt exist', function(done){
      request
        .put('/api/users/57d11f35b0a303c1234569df')
        .set('x-access-token', token)
        .send({
          username: 'njerry',
        })
        .end(function (err, res){
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('returns all documents belonging to a particular user', function(done){
      request
        .get('/api/users/' + userId + '/documents')
        .set('x-access-token', token)
        .end(function (err, res){
          expect(res.body).to.exist;
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0]).to.have.keys('_id', 'title', 'ownerId', 'content', 'modifiedAt', 'createdAt', '__v');
          done();
        });
    });

    it('asserts that cannot find documents o a non-existent user', function(done){
      request
        .get('/api/users/57d11f35b0a303c1234569df/documents')
        .set('x-access-token', token)
        .expect(404)
        .expect({message: 'User not found'}, done)
    });

    it('deletes a particular user inforation', function(done){
      request
        .delete('/api/users/' + userId)
        .set('x-access-token', token)
        .expect({message: 'User has been deleted'}, done);
    });
  });
})
