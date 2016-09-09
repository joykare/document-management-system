var app = require('../index');
var request = require('supertest')(app);
var expect = require('chai').expect;
var Document = require('../server/models/document');

describe('document test suite', function() {
  var token;
  var documentId;

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

  describe('/documents CRUD operations', function(){
    it('asserts that a new document has a unique title', function(){
      var title = Document.schema.paths.title;
      expect(title.options.unique).to.equal(true);
    });
    it('creates a new document', function(done){
      request
        .post('/api/documents')
        .set('x-access-token', token)
        .send({
          title: 'Test Doc',
          content: 'This should work'
        })
        .expect(200)
        .expect({message: 'New document created'}, done);
    });
    // it('asserts no two docs can have the same title', function(done){
    //   request
    //     .post('/api/documents')
    //     .set('x-access-token', token)
    //     .send({
    //       title: 'Test Doc',
    //       content: 'This should work'
    //     })
    //     .expect(409)
    //     .expect({message: 'Duplicate entry'}, done);
    // });
    it('gets all documents available', function(done){
      request
        .get('/api/documents')
        .set('x-access-token', token)
        .end(function (err, res){
          expect(res.status).to.equal(200);
          expect(res.body).to.exist;
          expect(Array.isArray(res.body)).to.equal(true);
          documentId = res.body[0]._id;
          done();
        });
    });
  });

  describe('/documents/:id test suite', function(){
    it('returns specific document', function(done){
      request
        .get('/api/documents/' + documentId)
        .set('x-access-token', token)
        .end(function (err, res){
          expect(res.status).to.equal(200);
          expect(res.body).to.exist;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('_id', 'title', 'content', 'modifiedAt', 'ownerId', 'createdAt', '__v');
          done();
        });
    });
    it('updates a document', function(done){
      request
        .put('/api/documents/' + documentId)
        .set('x-access-token', token)
        .send({
          title: 'Updated Doc',
          content: 'Whatever'
        })
        .expect(200)
        .expect({message: 'Document has been updated'}, done);
    })
    it('removes a document', function(done){
      request
        .delete('/api/documents/' + documentId)
        .set('x-access-token', token)
        .expect(200)
        .expect({message: 'Document has been deleted'}, done);
    })
  })

})
