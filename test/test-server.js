var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
	it('should list items on get', function(done) {
		chai.request(app)
		   .get('/items')
		   .end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.should.have.length(3);
			res.body[0].should.be.a('object');
			res.body[0].should.have.property('id');
			res.body[0].should.have.property('name');
			res.body[0].id.should.be.a('number');
			res.body[0].name.should.be.a('string');
			res.body[0].name.should.equal('Broad beans');
			res.body[1].name.should.equal('Tomatoes');
			res.body[2].name.should.equal('Cherry');
			done();	
		   });
	});
	it('should add an item on post', function(done) {
    chai.request(app)
      .post('/items')
      .field('name', 'Orange')
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
 //       res.body.should.have.property('name');
        res.body.id.should.be.a('number');
        res.body.name.should.be.a('string');
        res.body.name.should.not.equal('banana');
        res.body.name.should.equal('Orange');
        res.body.id.should.equal(4);
        done();
    });
  });
	it('should edit an item on put', function(done) {
    chai.request(app)
      .put('/items/3')
      .field('name', 'Water Melon')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
//        res.body.should.have.property('name');
        res.body.id.should.be.a('number');
        res.body.name.should.be.a('string');
        res.body.name.should.not.equal('banana');
        res.body.name.should.equal('Water Melon');
        res.body.id.should.equal(3);
        done();
    });
  });
	it('should delete an item on delete', function(done) {
    chai.request(app)
      .del('/items/5')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.id.should.be.a('number');
        res.body.name.should.be.a('string');
        res.body.name.should.equal('Milk');
        res.body.id.should.equal(5);
        done();
    });
  });
});
