import superagent from 'superagent';

const user = async () => {
  const { body } = await superagent.get('https://randomuser.me/api/');

  console.log('### Mocking user ###');
  console.log(`### Mock user email: ${body.results[0].email} ###`);

  const [u] = body.results;
  const { password } = u.login;
  return {
    ...u,
    password: password.length < 6 ? '123456' : password,
  };
};

export default user;
