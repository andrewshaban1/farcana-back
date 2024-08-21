import request from 'supertest';
import app from '../src/app';
import { User } from '../src/entities/user.entity';

describe('User Profile', () => {
  it('Should get profile data', async () => {
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

      const res2 = await request(app)
        .post('/login')
        .send({
          username: 'username',
          password: 'testPassword',
        })
        .expect(200);

      // Check if the "Set-Cookie" header is set
      expect(res2.headers['set-cookie']).toBeDefined();

      console.log(res2.headers['set-cookie']);

      // Check if the "jwt" cookie is present and configured correctly
      const [jwtCookie] = res2.headers['set-cookie'];

      expect(jwtCookie).toMatch(/jwt=/);
      expect(jwtCookie).toMatch(/HttpOnly/);
      expect(jwtCookie).toMatch(/Max-Age=86400/); // 86400 seconds = 24 hours
      expect(jwtCookie).toMatch(/Path=\/;/);

      const res3 = await request(app)
        .get(`/profile/${res.body.id}`)
        .set('Cookie', jwtCookie)
        .expect(200);

      expect(res3.body).toHaveProperty('data');
    } finally {
      // cleaning trash
      if (res && res.body && res.body.id) {
        await User.destroy({ where: { id: res.body.id } });
      }
    }
  });

  it('Should get an error with cookie is not set', async () => {
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

      const res2 = await request(app)
        .post('/login')
        .send({
          username: 'username',
          password: 'testPassword',
        })
        .expect(200);

      // Check if the "Set-Cookie" header is set
      expect(res2.headers['set-cookie']).toBeDefined();

      console.log(res2.headers['set-cookie']);

      // Check if the "jwt" cookie is present and configured correctly
      const [jwtCookie] = res2.headers['set-cookie'];

      expect(jwtCookie).toMatch(/jwt=/);
      expect(jwtCookie).toMatch(/HttpOnly/);
      expect(jwtCookie).toMatch(/Max-Age=86400/); // 86400 seconds = 24 hours
      expect(jwtCookie).toMatch(/Path=\/;/);

      const res3 = await request(app)
        .get(`/profile/${res.body.id}`)
        .expect(401);

      expect(res3.body).toHaveProperty('message');
    } finally {
      // cleaning trash
      if (res && res.body && res.body.id) {
        await User.destroy({ where: { id: res.body.id } });
      }
    }
  });
});
