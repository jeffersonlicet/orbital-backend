import { encrypt } from '../helpers/password';

const TABLE_NAME = 'users';

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(TABLE_NAME, [
    {
      firstname: 'Adhara',
      lastname: 'virgins',
      email: 'adhara@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: await encrypt('test'),
      avatar: 'https://google.com',
      instagram: 'adhara',
      locationEnabled: true,
    },
    {
      firstname: 'Baten',
      lastname: 'Kaitos',
      email: 'baten@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: await encrypt('test'),
      avatar: 'https://google.com',
      instagram: 'baten',
      locationEnabled: true,
    },
    {
      firstname: 'Capella',
      lastname: 'Caph',
      email: 'capella@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: await encrypt('test'),
      avatar: 'https://google.com',
      instagram: 'capella',
    },
  ]),

  down: ({ bulkDelete }) => bulkDelete(TABLE_NAME, null, {}),
};
