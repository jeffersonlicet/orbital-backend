import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: Sequelize.STRING,
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
