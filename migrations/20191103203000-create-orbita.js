const TABLE_NAME = 'orbits';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false,
      },
    });

    await queryInterface.addConstraint(TABLE_NAME, ['userId'], {
      type: 'FOREIGN KEY',
      name: 'FK_orbits_userId_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: (queryInterface) => queryInterface.dropTable(TABLE_NAME),
};
