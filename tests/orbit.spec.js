import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('Orbit', () => {
  let alice;

  before(async () => {
    alice = await mockUser();
  });

  describe('/orbit', () => {
    it('should update orbit', async () => {
      const { status } = await api.put('/orbit', alice.token, {
        latitude: '50.871962',
        longitude: '4.287370999999999',
      });
      expect(status).equals(200);
    });

    it('should fail if invalid token', async () => {
      const { status } = await api.get('/orbit');
      expect(status).equals(401);
    });

    it('should find users in orbit', async () => {
      const { status } = await api.get('/orbit');
      expect(status).equals(200);
    });
  });
});
