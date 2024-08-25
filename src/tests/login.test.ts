import request from 'supertest';
import app from '../app';
import { User } from '../entities/user.entity';

describe('User Login', () => {
  it('Should set a jwt cookie on successful login', async () => {
    let res;
    let res2;
    try {
      res = await request(app)
        .post('/register')
        .send({
          username: 'username',
          email: 'user@email.com',
          password: 'testPassword',
          data: 'data',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.username).toEqual('username');
      expect(res.body.email).toEqual('user@email.com');

      res2 = await request(app)
        .post('/login')
        .send({
          username: 'username',
          password: 'testPassword',
        })
        .expect(200);

      expect(res2.body).toHaveProperty('id');
      // Check if the "Set-Cookie" header is set
      expect(res2.headers['set-cookie']).toBeDefined();

      console.log(res2.headers['set-cookie']);

      // Check if the "jwt" cookie is present and configured correctly
      const [jwtCookie] = res2.headers['set-cookie'];

      expect(jwtCookie).toMatch(/jwt=/);
      expect(jwtCookie).toMatch(/HttpOnly/);
      expect(jwtCookie).toMatch(/Max-Age=86400/); // 86400 seconds = 24 hours
      expect(jwtCookie).toMatch(/Path=\/;/);
    } finally {
      // cleaning trash
      if (res && res.body && res.body.id) {
        await User.destroy({ where: { id: res.body.id } });
      }
    }
  });

  it('Should not login with incorrect credentials', async () => {
    let res;
    let res2;
    try {
      res = await request(app)
        .post('/register')
        .send({
          username: 'username',
          email: 'user@email.com',
          password: 'testPassword',
          data: 'data',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.username).toEqual('username');
      expect(res.body.email).toEqual('user@email.com');

      res2 = await request(app)
        .post('/login')
        .send({
          username: 'username',
          password: 'testPassword1',
        })
        .expect(401); // Expecting HTTP status 401 for unauthorized

      expect(res2.body).toHaveProperty('message');
    } finally {
      // cleaning trash
      if (res && res.body && res.body.id) {
        await User.destroy({ where: { id: res.body.id } });
      }
    }
  });

  it('Should be bad request response when not all credentials are provided', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'username',
      })
      .expect(400); // Expecting HTTP status 400 for bad request

    expect(res.body).toHaveProperty('message');
  });
});
