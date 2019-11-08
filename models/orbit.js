import Sequelize from 'sequelize';

export default class Invitation extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: Sequelize.NUMBER,
    },
    {
      sequelize,
      modelName: 'orbit',
    });
  }
}
