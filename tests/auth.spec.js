import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('Auth', () => {
  describe('/signup', () => {
    it('should register a user', async () => {
      console.log(await mockUser());
      const { body } = await api.post('/auth/signup', { username: 'jeff' });
      console.log(body);
    });
  });
});
