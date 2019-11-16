import Sequelize from 'sequelize';
import { encrypt } from '../helpers/password';

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
      birthday: Sequelize.DATE,
      password: Sequelize.STRING,
      email: Sequelize.STRING,
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      instagram: Sequelize.STRING,
      locationEnabled: Sequelize.BOOLEAN,
      avatar: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: 'user',
      defaultScope: {
        attributes: { exclude: ['password', 'email'] },
      },
      scopes: {
        admin: {
          attributes: { },
        },
      },
      hooks: {
        beforeCreate: (user) => encrypt(user.password).then((password) => {
          // eslint-disable-next-line no-param-reassign
          user.password = password;
        }),
      },
    });
  }

  static associate(models) {
    this.hasMany(models.Invitation, { foreignKey: 'inviterId', as: 'invitationsSent' });
    this.hasMany(models.Invitation, { foreignKey: 'inviteeId', as: 'invitationsReceived' });
    this.hasOne(models.Orbit, { foreignKey: 'userId' });
  }
}
