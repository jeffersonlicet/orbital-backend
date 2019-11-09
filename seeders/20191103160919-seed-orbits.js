const TABLE_NAME = 'orbits';

module.exports = {
  up: async (queryInterface) => {
    const [[adhara, baten]] = await queryInterface.sequelize.query('SELECT id from users;');
    await queryInterface.bulkInsert(TABLE_NAME, [
      {
        createdAt: new Date(),
        position: queryInterface.sequelize.fn(
          'ST_GeomFromText',
          'POINT(50.871962 4.287370999999999)',
        ),
        userId: adhara.id,
      },
      {
        createdAt: new Date(),
        position: queryInterface.sequelize.fn(
          'ST_GeomFromText',
          'POINT(50.871962 4.287370999999999)',
        ),
        userId: baten.id,
      },
    ]);
  },

  down: ({ bulkDelete }) => bulkDelete(TABLE_NAME, null, {}),
};
