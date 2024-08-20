import request from 'supertest';
import app from '../src/app';
import { User } from '../src/entities/user.entity';

describe('User Registration', () => {
  it('Should create a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testusername',
        email: 'user@email',
        password: 'testPassword',
      })
      .expect(201);

    // cleaning trash
    await User.destroy({ where: { id: res.body.id } });

    expect(res.body).toHaveProperty('ids');
    expect(res.body.username).toEqual('testusername');
    expect(res.body.email).toEqual('user@email');
  });
});
