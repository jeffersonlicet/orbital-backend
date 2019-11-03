import { encrypt } from '../helpers/password';

const TABLE_NAME = 'users';

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(TABLE_NAME, [{
    firstname: 'Jefferson',
    lastname: 'Licet',
    email: 'jeffersonlicet@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: await encrypt('test'),
    username: 'jeffersonlicet',
    instagram: 'javierscript',
  }]),

  down: ({ bulkDelete }) => bulkDelete(TABLE_NAME, null, {}),
};
