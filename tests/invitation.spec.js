import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('Invitation', () => {
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

  describe('/invitations', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.get('/user');
      expect(status).equals(401);
    });

    it('should return user invitations', async () => {
      const { status, body } = await api.get('/invitations', alice.token);
      expect(status).equals(200);
      expect(body.user.id).equals(alice.id);
    });
  });

  describe('/invite', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.post('/invite', {
        userId: bob.id,
      });
      expect(status).equals(401);
    });

    it('should fail if inviting himself', async () => {
      const { status } = await api.post('/invite', {
        userId: alice.id,
      }, alice.token);
      expect(status).equals(401);
    });

    it('should invite the user', async () => {
      const { status, body } = await api.post('/invite', {
        userId: bob.id,
      }, alice.token);
      expect(status).equals(200);
      expect(body.user.id).equals(alice.id);
    });

    it('should noop if already invited', async () => {
      const { status, body } = await api.post('/invite', {
        userId: bob.id,
      }, alice.token);
      expect(status).equals(200);
      expect(body.user.id).equals(alice.id);
    });
  });

  describe('/invite/accept/:invitationId', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.post('/invite/accept/1', {
        userId: bob.id,
      });
      expect(status).equals(401);
    });

    it('should accept the invitation', async () => {
      const { status, body } = await api.post('/invite/accept/:invitationId', {
        userId: bob.id,
      }, alice.token);
      expect(status).equals(200);
      expect(body.user.id).equals(alice.id);
    });
  });

  describe('/invite/decline/:invitationId', () => {
    it('should fail if invalid token', async () => {
      const { status } = await api.post('/invite/accept/1', {
        userId: bob.id,
      });
      expect(status).equals(401);
    });

    it('should decline the invitation', async () => {
      const { status, body } = await api.post('/invite/accept/:invitationId', {
        userId: bob.id,
      }, alice.token);
      expect(status).equals(200);
      expect(body.user.id).equals(alice.id);
    });
  });
});
