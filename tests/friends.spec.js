import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('Friends', () => {
  let alice;
  let bob;
  before(async () => {
    alice = await mockUser();
    bob = await mockUser();
  });

  describe('/friends', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.get('/user');
      expect(status).equals(401);
    });

    it('should return user friends', async () => {
      const { status } = await api.get('/friends', alice.token);
      expect(status).equals(200);
    });
  });

  describe('/friends/remove/:userId', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.post('/invite', {
        userId: bob.id,
      });
      expect(status).equals(401);
    });

    it('should remove user from friends', async () => {
      const { status } = await api.post('/friends/remove/', {
        userId: alice.id,
      }, alice.token);
      expect(status).equals(401);
    });
  });
});
