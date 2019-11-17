import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('Orbit', () => {
  let alice;
  let bob;
  before(async () => {
    alice = await mockUser();
    bob = await mockUser();

    const { body } = await api.post('/auth/signup', {
      email: alice.email,
      password: alice.password,
      birthday: alice.dob.date,
      lastname: alice.name.last,
      avatar: alice.picture.large,
      firstname: alice.name.first,
      instagram: `${alice.name.first}`,
    });

    alice.token = body.token;
    alice.id = body.user.id;

    await api.post('/auth/signup', {
      email: bob.email,
      password: bob.password,
      birthday: bob.dob.date,
      lastname: bob.name.last,
      avatar: bob.picture.large,
      firstname: bob.name.first,
      instagram: `${bob.name.first}`,
    });
  });

  describe('/orbit', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.get('/user');
      expect(status).equals(401);
    });

    it('should return users in orbit', async () => {
      const { status, body } = await api.get('/orbit', alice.token);
      expect(status).equals(200);
      expect(body.user.id).equals(alice.id);
    });

    it('should update user\'s orbit', async () => {
      const { status, body } = await api.get('/orbit', alice.token);
      expect(status).equals(200);
      expect(body.user.id).equals(alice.id);
    });
  });
});
