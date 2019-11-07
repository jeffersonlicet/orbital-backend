import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      birthdate: Sequelize.DATE,
      password: Sequelize.STRING,
      username: Sequelize.STRING,
      email: Sequelize.STRING,
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      instagram: Sequelize.STRING,
      locationEnabled: Sequelize.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'user',
    });
  }

  static associate(models) {
    this.hasMany(models.Invitation, { foreignKey: 'inviterId', as: 'invitationsSent' });
    this.hasMany(models.Invitation, { foreignKey: 'inviteeId', as: 'invitationsReceived' });
  }
}
