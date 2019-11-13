import superagent from 'superagent';

const user = async () => {
  const { body } = await superagent.get('https://randomuser.me/api/');
  const [u] = body.results;
  const { password } = u.login;
  return {
    ...u,
    password: password.length < 6 ? '123456' : password,
  };
};

export default user;
