const TABLE_NAME = 'users';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    TABLE_NAME,
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      firstname: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      lastname: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      instagram: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      locationEnabled: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
  ),

  down: (queryInterface) => queryInterface.dropTable(TABLE_NAME),
};
