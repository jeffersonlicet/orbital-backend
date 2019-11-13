import { expect } from 'chai';
import mockUser from './mock';
import api from './api';

describe('Auth', () => {
  describe('/signup', () => {
    it('should register a user', async () => {
      const {
        name, email, dob, picture, login,
      } = await mockUser();
      const { body, status } = await api.post('/auth/signup', {
        instagram: `${name.first}`,
        firstname: name.first,
        lastname: name.last,
        email,
        password: login.password,
        birthday: dob.date,
        avatar: picture.large,
      });
      console.log(body);
      expect(status).equals(200);
    });
  });
});
