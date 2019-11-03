import Sequelize, { Model } from 'sequelize';

class User extends Model {}

const UserModel = sequelize => {
  User.init({
    title: Sequelize.STRING,
    description: Sequelize.TEXT
  }, { sequelize, modelName: 'User' });
};

export default UserModel;