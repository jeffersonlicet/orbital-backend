module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    id: DataTypes.STRING,
  }, {});

  user.associate = (models) => {
  };

  return user;
};
