import request from 'supertest';
import app from '../src/app';
import { User } from '../src/entities/user.entity';

describe('User Registration', () => {
  it('Should create a new user', async () => {
    let res;
    try {
      res = await request(app)
        .post('/register')
        .send({
          username: 'username',
          email: 'user@email.com',
          password: 'testPassword',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.username).toEqual('username');
      expect(res.body.email).toEqual('user@email.com');
    } finally {
      // cleaning trash
      if (res && res.body && res.body.id) {
        await User.destroy({ where: { id: res.body.id } });
      }
    }
  });

  it('Should not create a user with invalid data', async () => {
    let res;
    try {
      res = await request(app)
        .post('/register')
        .send({
          username: '', // Invalid data
        })
        .expect(400); // Expecting HTTP status 400 for bad request

      expect(res.body).toHaveProperty('message');
    } finally {
      // cleaning trash
      if (res && res.body && res.body.id) {
        await User.destroy({ where: { id: res.body.id } });
      }
    }
  });

  it('Should not create a user with the same credentials', async () => {
    let res;
    let res2;
    try {
      res = await request(app)
        .post('/register')
        .send({
          username: 'username',
          email: 'user@email.com',
          password: 'testPassword',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.username).toEqual('username');
      expect(res.body.email).toEqual('user@email.com');

      res2 = await request(app)
        .post('/register')
        .send({
          username: 'username',
          email: 'user@email.com',
          password: 'testPassword',
        })
        .expect(400); // Expecting HTTP status 400 for bad request

      expect(res2.body).toHaveProperty('message');
    } finally {
      // cleaning trash
      if (res && res.body && res.body.id) {
        await User.destroy({ where: { id: res.body.id } });
      }
      if (res2 && res2.body && res2.body.id) {
        await User.destroy({ where: { id: res2.body.id } });
      }
    }
  });
});
