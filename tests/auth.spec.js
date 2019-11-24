import { expect } from 'chai';
import { rawUser } from './mock';
import api from './api';

describe('Auth', () => {
  describe('/signup', () => {
    it('should signup and return the jwt', async () => {
      const randomRawUser = await rawUser();

      const { status, body } = await api.post('/auth/signup', randomRawUser);

      expect(status).equals(200);
      expect(body.user.firstname).equals(randomRawUser.firstname);
      expect(!!body.token).equal(true);
    });

    it('should fail if invalid email', async () => {
      const randomRawUser = await rawUser();


      const { status } = await api.post('/auth/signup', {
        ...randomRawUser,
        email: '123',
      });

      expect(status).equals(422);
    });

    it('should fail if existing email', async () => {
      const randomRawUser = await rawUser();

      const { status } = await api.post('/auth/signup', randomRawUser);
      expect(status).equals(200);

      const res = await api.post('/auth/signup', randomRawUser);
      expect(res.status).equals(422);
    });

    it('should fail if missing required param', async () => {
      const { status } = await api.post('/auth/signup', {});
      expect(status).equals(422);
    });
  });

  describe('/login', () => {
    it('should login', async () => {
      const randomRawUser = await rawUser();

      const { status, body } = await api.post('/auth/signup', randomRawUser);

      expect(status).equals(200);
      const res = await api.post('/auth/login', {
        email: randomRawUser.email,
        password: randomRawUser.password,
      });

      expect(res.status).equals(200);
      expect(!!res.body.token).equal(true);
      expect(res.body.user.id).equal(body.user.id);
    });

    it('should return error if invalid credentials', async () => {
      const randomRawUser = await rawUser();
      const { status } = await api.post('/auth/signup', randomRawUser);

      expect(status).equals(200);

      const res = await api.post('/auth/login', {
        email: randomRawUser.email,
        password: '1234567',
      });
      expect(res.status).equals(400);
    });
  });
});
