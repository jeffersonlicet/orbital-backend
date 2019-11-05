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
      birthdate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
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
      },
      locationEnabled: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
  ),

  down: (queryInterface) => queryInterface.dropTable(TABLE_NAME),
};
