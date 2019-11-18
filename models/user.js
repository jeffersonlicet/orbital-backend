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

  buildView() {
    const attrs = this.dataValues;
    delete attrs.password;
    delete attrs.email;
    return attrs;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: 'inviterId',
      through: 'invitation',
      as: 'invitationsSent',
      otherKey: 'inviterId',
    });

    this.hasOne(models.Orbit, { foreignKey: 'userId' });

    this.belongsToMany(models.User, {
      foreignKey: 'inviteeId',
      through: 'invitation',
      as: 'invitationsReceived',
      otherKey: 'inviteeId',
    });

    this.belongsToMany(models.User, { through: 'friendship', as: 'friends' });
  }
}
