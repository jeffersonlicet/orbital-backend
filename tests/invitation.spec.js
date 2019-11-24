import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('Invitation', () => {
  let alice;
  let bob;

  beforeEach(async () => {
    alice = await mockUser();
    bob = await mockUser();
  });

  describe('/invitations/invite', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.post('/invitations/invite', {
        userId: bob.id,
      });
      expect(status).equals(401);
    });

    it('should fail if missing invitee id', async () => {
      const { status } = await api.post('/invitations/invite', {}, alice.token);
      expect(status).equals(422);
    });

    it('should fail if inviting himself', async () => {
      const { status } = await api.post('/invitations/invite', {
        userId: alice.id,
      }, alice.token);
      expect(status).equals(422);
    });

    it('should invite the user', async () => {
      const { status } = await api.post('/invitations/invite', {
        userId: bob.id,
      }, alice.token);

      expect(status).equals(200);

      const res = await api.get('/invitations/received', bob.token);
      expect(res.status).equals(200);
      expect(res.body.length).equals(1);
    });

    it('should noop if already invited', async () => {
      await api.post('/invitations/invite', {
        userId: bob.id,
      }, alice.token);

      await api.post('/invitations/invite', {
        userId: bob.id,
      }, alice.token);

      const res = await api.get('/invitations/received', bob.token);
      expect(res.body.length).equals(1);
    });
  });

  describe('/invitations/accept', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.post('/invitations/accept');
      expect(status).equals(401);
    });

    it('should fail if missing invitation id', async () => {
      const { status } = await api.post('/invitations/accept', {}, alice.token);
      expect(status).equals(422);
    });

    it('should accept the invitation', async () => {
      await api.post('/invitations/invite', { userId: bob.id }, alice.token);
      const res = await api.get('/invitations/received', bob.token);

      const { status } = await api.post('/invitations/accept', {
        invitationId: res.body[0].invitation.id,
      }, bob.token);
      expect(status).equals(200);

      const res2 = await api.get('/invitations/received', bob.token);
      expect(res2.body.length).equals(0);
    });

    it('should noop if already accepted the invitation', async () => {
      await api.post('/invitations/invite', { userId: bob.id }, alice.token);
      const res = await api.get('/invitations/received', bob.token);

      const { status } = await api.post('/invitations/accept', {
        invitationId: res.body[0].invitation.id,
      }, bob.token);

      expect(status).equals(200);

      const res2 = await api.post('/invitations/accept', {
        invitationId: res.body[0].id,
      }, bob.token);

      expect(res2.status).equals(422);
    });
  });
});
