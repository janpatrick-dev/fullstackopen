const bcrypt = require('bcrypt');
const app = require('../app');
const supertest = require('supertest');
const User = require('../models/user');
const helper = require('./test_helper');
const api = supertest(app);

describe('4.16 creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('without username will cause status 401', async () => {
    const body = { password: 'testpassword', name: 'John Doe' };
    
    const response = await api
      .post('/api/users')
      .send(body)
      .expect(400)
      .expect('Content-Type', /application\/json/);
      
    expect(response.body.error).toBe('username is required!');
  });

  test('without password will cause status 401', async () => {
    const body = { username: 'johndoe', name: 'John Doe' };
    
    const response = await api
      .post('/api/users')
      .send(body)
      .expect(400)
      .expect('Content-Type', /application\/json/);
      
    expect(response.body.error).toBe('password is required!');
  });

  test('with username that has less than 3 characters will cause 401', async () => {
    const body ={ username: 'jo', password: 'testpassword', name: 'John Doe' };

    const response = await api
      .post('/api/users')
      .send(body)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toMatch(/User validation failed/);
    expect(response.body.error).toMatch(/minimum allowed length/);
  });

  test('with password that has less than 3 characters will cause 401', async () => {
    const body ={ username: 'johndoe', password: 'te', name: 'John Doe' };

    const response = await api
      .post('/api/users')
      .send(body)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toMatch(/characters or more/);
  });

  // test('with username that has less than 3 characters will cause 401', async () => {
  //   const body = { username: 'jo', password: 'testpassword', name: 'John Doe' };

  //   const response = await api
  //     .post('/api/users')
  //     .send(body)
  //     .expect(401)
  //     .expect('Content-Type', /application\/json/);

  //   expect(response.body.error).
  // });
});