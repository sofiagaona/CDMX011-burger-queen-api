const supertest = require('supertest');
const app = require('../../index');

const api = supertest(app);
const {
  getUsers,
} = require('../users');

describe('getUsers', () => {
  it('should get users collection', (done) => {
    done();
  });
});
