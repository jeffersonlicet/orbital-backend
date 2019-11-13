import superagent from 'superagent';

const user = async () => {
  const { body } = await superagent.get('https://randomuser.me/api/');
  return body.results[0];
};

export default user;
