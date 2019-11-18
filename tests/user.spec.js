import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('User', () => {
  let alice;
  let bob;
  before(async () => {
    alice = await mockUser();
    bob = await mockUser();
  });

  describe('/user', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.get('/user');
      expect(status).equals(401);
    });

    it('should return session data', async () => {
      const { status, body } = await api.get('/user', alice.token);
      expect(status).equals(200);
      expect(body.user.id).equals(alice.id);
    });

    it('should update user data', async () => {
      const { firstname } = await mockUser();

      const { status } = await api.put('/user', alice.token, {
        firstname,
      });

      expect(status).equals(200);

      const res = await api.get('/user', alice.token);
      expect(res.body.user.firstname).equals(firstname);
    });
  });

  describe('/user/:userId', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.get('/user/1');
      expect(status).equals(401);
    });

    /*it('should return user relative state', async () => {
      const { status, body } = await api.get(`/user/${bob.id}`, alice.token);
      expect(status).equals(200);
    });
    */
  });
});
