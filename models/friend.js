import Sequelize from 'sequelize';

export default class Friend extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: Sequelize.NUMBER,
      friendId: Sequelize.NUMBER,
    },
    {
      sequelize,
      modelName: 'friends',
      tableName: 'friendship',
    });
  }
}
