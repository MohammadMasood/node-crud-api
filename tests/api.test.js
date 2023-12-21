const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, server} = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {
  let userId;

  it('should get all users with GET /api/users', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(0);
        done();
      });
  });

  it('should create a new user with POST /api/users', (done) => {
    chai.request(app)
      .post('/api/users')
      .send({
        username: 'JohnDoe',
        age: 25,
        hobbies: ['Reading', 'Gaming']
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        userId = res.body.id;
        done();
      });
  });

  it('should get the created user with GET /api/users/:userId', (done) => {
    chai.request(app)
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(userId);
        done();
      });
  });

  it('should update the created user with PUT /api/users/:userId', (done) => {
    chai.request(app)
      .put(`/api/users/${userId}`)
      .send({
        age: 26,
        hobbies: ['Reading', 'Traveling']
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(userId);
        expect(res.body.age).to.equal(26);
        expect(res.body.hobbies).to.deep.equal(['Reading', 'Traveling']);
        done();
      });
  });

  it('should delete the created user with DELETE /api/users/:userId', (done) => {
    chai.request(app)
      .delete(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it('should not find the deleted user with GET /api/users/:userId', (done) => {
    chai.request(app)
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 400 for invalid userId in GET /api/users/:userId', (done) => {
    chai.request(app)
      .get('/api/users/invalidUserId')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return 404 for non-existing endpoint', (done) => {
    chai.request(app)
      .get('/api/non-existing-endpoint')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  // Add more test cases as needed

  // After all tests, close the server
  after((done) => {
    server.close(() => {
      console.log('Server closed');
      done();
    });
  });
});