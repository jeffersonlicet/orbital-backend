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
      inviterId: Sequelize.NUMBER,
      status: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: 'invitation',
    });
  }
}
