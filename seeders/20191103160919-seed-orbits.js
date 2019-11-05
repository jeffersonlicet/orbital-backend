const TABLE_NAME = 'orbits';

module.exports = {
  up: async (queryInterface) => {
    const [[adhara, baten]] = await queryInterface.sequelize.query('SELECT id from users;');
    await queryInterface.bulkInsert(TABLE_NAME, [
      {
        createdAt: new Date(),
        position: { type: 'Point', coordinates: [39.807222, -76.984722] }, //TODO
        userId: adhara.id,
      },
      {
        createdAt: new Date(),
        position: { type: 'Point', coordinates: [39.807222, -76.984722] }, //TODO
        userId: baten.id,
      },
    ]);
  },

  down: ({ bulkDelete }) => bulkDelete(TABLE_NAME, null, {}),
};
