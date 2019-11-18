const TABLE_NAME = 'friendship';

module.exports = {
  up: async (queryInterface) => {
    const [[, baten, capella]] = await queryInterface.sequelize.query('SELECT id from users;');
    await queryInterface.bulkInsert(TABLE_NAME, [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: baten.id,
        friendId: capella.id,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: capella.id,
        friendId: baten.id,
      },
    ]);
  },

  down: ({ bulkDelete }) => bulkDelete(TABLE_NAME, null, {}),
};
