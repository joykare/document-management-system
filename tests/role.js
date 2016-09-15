var app = require('../index');
var request = require('supertest')(app);
var expect = require('chai').expect;
var Document = require('../server/models/role');

describe('role test suite', function() {
  var token;

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

  it('returns all the roles availed', function(done){
    request
      .get('/api/roles')
      .set('x-access-token', token)
      .end(function (err, res){
        expect(res.body).to.exist;
        expect(Array.isArray(res.body)).to.equal(true);
        expect(res.body).to.have.length(2);
        done();
      });
  });
  it('creates a role', function(done){
    request
      .post('/api/roles')
      .set('x-access-token', token)
      .send({
        role: 'superadmin'
      })
      .end(function (err, res){
        expect(res.body.message).to.equal('Role saved');
        done();
      });
  });
  it('asserts that you cannot create role not in array', function(done){
    request
      .post('/api/roles')
      .set('x-access-token', token)
      .send({
        role: 'viewer'
      })
      .end(function (err, res){
        expect(res.body.message).to.equal('Is not an allowable role');
        done();
      })
  })
});
