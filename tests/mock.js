import times from 'lodash/times';
import random from 'lodash/random';

import api from './api';

const randomString = (len = 20) => times(len, () => random(35).toString(36)).join('');

export const rawUser = () => {
  const [
    email,
    firstname,
    lastname,
    password,
    instagram,
  ] = times(5, () => randomString(15));
  return {
    email: `${email}@gmail.com`,
    firstname,
    lastname,
    password,
    instagram,
    birthday: new Date(),
    avatar: 'https://i.imgur.com/fjxSiYi.jpg',
  };
};

const user = async () => {
  const randomUser = rawUser();
  const res = await api.post('/auth/signup', randomUser);
  return {
    ...randomUser,
    id: res.body.user.id,
    token: res.body.token,
  };
};

export default user;
