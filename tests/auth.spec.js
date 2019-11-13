import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('Auth', () => {
  describe('/signup', () => {
    it('should register a user', async () => {
      const {
        name, email, dob, picture, password,
      } = await mockUser();

      const { status } = await api.post('/auth/signup', {
        email,
        password,
        birthday: dob.date,
        lastname: name.last,
        avatar: picture.large,
        firstname: name.first,
        instagram: `${name.first}`,
      });

      expect(status).equals(200);
    });

    it('should fail if existing email', async () => {
      const {
        name, email, dob, picture, password,
      } = await mockUser();

      const data = {
        email,
        password,
        birthday: dob.date,
        lastname: name.last,
        avatar: picture.large,
        firstname: name.first,
        instagram: `${name.first}`,
      };

      const { status } = await api.post('/auth/signup', data);
      expect(status).equals(200);
    });
  });
});
