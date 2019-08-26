
const Hapi = require('@hapi/hapi');
const chai = require('chai');
const chaiHttp = require('chai-http'); //types');
chai.use(chaiHttp);

const assert = chai.assert;
const HapiAuth = require('../index');

const UserObject = require('./user.example');


describe('hapi-auth', () => {

  let Hapi;
  let server;
  let serverUrl;
  let token;
  let refreshToken;

  before( () => {
    Hapi = require('@hapi/hapi');

    server = new Hapi.Server({
      port: 3030,
      host: 'localhost',
    });

    const start = async function() {
      server.decorate('request', 'user', function() { return UserObject.User });
      await HapiAuth.auth(server, UserObject.User);
      await server.register(hapiAuth.plugin);
      await server.start();
      serverUrl = server.info.uri;
      console.log(`Server running at: ${server.info.uri}, auth version ${hapiAuth.version}\n`);
    };
    return start();
  });

  describe('test available [get]', () => {
    it('connect', () => {
      return chai.request(serverUrl)
        .get('/')
        .then((res) => {
          assert.equal(res.status, 200, 'status ok');
          assert.equal(res.text, 'Hello, interface!', 'got the return')
        })
    })
  });

  describe('user', () => {
    it('register', () => {
      return chai.request(serverUrl)
        .post('/register')
        .send( {
          username: 'auth.testName',
          password: '123456',
          email: 'info@test.com',
          accept: true,
        })
        .then((res) => {
          assert.equal(res.status, 200, 'status ok');
          assert.equal(res.body.username, 'auth.testName', 'user created');
          // client = res.body;
        });
    });
    it('login new user', () => {
      return chai.request(serverUrl)
        .post('/login')
        .send({
          email: 'auth@test.com',
          password: '123456'
        })
        .then( (res) => {
          assert.equal(res.status, 200, 'status ok');
          assert.exists(res.body.token, 'has token');
          assert.exists(res.body.refreshToken, 'has refresh token');
          token = res.body.token;
          refreshToken = res.body.refreshToken;
        })
    });
    it('block users with no account', () => {
      return chai.request(serverUrl)
        .post('/login')
        .send({
          email: 'auth@test.com',
          password: 'WrongWord'
        })
        .then((res) => {
          assert.equal(res.status, 403, 'access denied');
          assert.notExists(res.body.token, 'no token')
        })
    });
    it('test secure route no Authorization', () => {
      return chai.request(serverUrl)
        .get('/secure')
        .then((res) => {
          assert.equal(res.status, 401, 'access denied (missing access token)');
        });
    });
    it('test secure route', () => {
      return chai.request(serverUrl)
        .get('/secure')
        .set('Authorization', token)
        .then((res) => {
          assert.equal(res.status, 200, 'access allowed');
        });
    });
    it('test secure route', () => {
      return chai.request(serverUrl)
        .get('/secure')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJ2YWwiLCJpYXQiOjE0MjI2MDU0NDV9.eUiabuiKv-8PYk2AkGY4Fb5KMZeorYBLw261JPQD5lM')
        .then((res) => {
          assert.equal(res.status, 401, 'wrong token');
        });
    });
    it('test refresh token', () => {
      return chai.request(serverUrl)
        .post('/token')
        .send({
          token: refreshToken
        })
        .then( (res) => {
          assert.equal(res.status, 200, 'ok');
          assert.exists(res.body.token, 'has token');
        })
    });

    it('reset an user', () => {
      return chai.request(serverUrl)
        .post('/resetAccount')
        .send({
          username: 'test.api'
        })
        .then( (res) => {
          assert.equal(res.status, 200, 'ok');
          assert.equal(res.body.username, 'test.api', 'got the name');
        });
    })
  });
});

