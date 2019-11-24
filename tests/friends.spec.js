import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('Friends', () => {
  let alice;
  let bob;

  before(async () => {
    alice = await mockUser();
    bob = await mockUser();

    await api.post('/invitations/invite', { userId: bob.id }, alice.token);
    const { body } = await api.get('/invitations/received', bob.token);
    await api.post('/invitations/accept', {
      invitationId: body[0].invitation.id,
    }, bob.token);

    const res = await api.get('/friends', alice.token);
    expect(res.body.length).equals(1);
  });

  describe('/friends', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.get('/user');
      expect(status).equals(401);
    });

    it('should return user friends', async () => {
      const res = await api.get('/friends', alice.token);
      expect(res.body.length).equals(1);
      expect(res.status).equals(200);
    });
  });

  describe('/friends/remove', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.post('/friends/remove', {
        userId: bob.id,
      });
      expect(status).equals(401);
    });

    it('should remove user from friends', async () => {
      const { status } = await api.post('/friends/remove/', {
        userId: bob.id,
      }, alice.token);
      expect(status).equals(200);

      const res = await api.get('/friends', alice.token);
      expect(res.body.length).equals(0);

      const res2 = await api.get('/friends', bob.token);
      expect(res2.body.length).equals(0);
    });
  });
});
