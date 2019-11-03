import { encrypt } from '../helpers/password';

const TABLE_NAME = 'users';

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(TABLE_NAME, [{
    firstname: 'Adhara',
    lastname: 'virgins',
    email: 'adhara@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: await encrypt('test'),
    username: 'adhara',
    instagram: 'adhara',
  }, {
    firstname: 'Baten',
    lastname: 'Kaitos',
    email: 'baten@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: await encrypt('test'),
    username: 'baten',
    instagram: 'baten',
  }]),

  down: ({ bulkDelete }) => bulkDelete(TABLE_NAME, null, {}),
};
