import Sequelize from 'sequelize';

export default class Orbit extends Sequelize.Model {
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
