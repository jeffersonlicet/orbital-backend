import superagent from 'superagent';
import api from './api';

export const rawUser = async () => {
  const { body } = await superagent.get('https://randomuser.me/api/');
  const [u] = body.results;
  const { password } = u.login;
  return {
    ...u,
    password: password.length < 6 ? '123456' : password,
  };
};

const user = async () => {
  const { body } = await superagent.get('https://randomuser.me/api/');
  const [u] = body.results;
  const { password } = u.login;
  const account = {
    ...u,
    password: password.length < 6 ? '123456' : password,
  };

  const res = await api.post('/auth/signup', {
    email: account.email,
    password: account.password,
    birthday: account.dob.date,
    lastname: account.name.last,
    avatar: account.picture.large,
    firstname: account.name.first,
    instagram: `${account.name.first}`,
  });

  return {
    email: account.email,
    password: account.password,
    birthday: account.dob.date,
    lastname: account.name.last,
    avatar: account.picture.large,
    firstname: account.name.first,
    instagram: `${account.name.first}`,
    id: res.body.user.id,
    token: res.body.token,
  };
};

export default user;
