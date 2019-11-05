import Sequelize from 'sequelize';

export default class Invitation extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      inviteeId: Sequelize.NUMBER,
    },
    {
      sequelize,
      modelName: 'invitation',
    });
  }
}
