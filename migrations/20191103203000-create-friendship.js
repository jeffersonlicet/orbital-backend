const TABLE_NAME = 'friendship';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      friendId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint(TABLE_NAME, ['userId'], {
      type: 'FOREIGN KEY',
      name: 'FK_friendship_userId_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });

    await queryInterface.addConstraint(TABLE_NAME, ['friendId'], {
      type: 'FOREIGN KEY',
      name: 'FK_friendship_friendId_user',
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
