module.exports = (sequelize, DataTypes) => {
  const invitation = sequelize.define('users', {
    id: DataTypes.STRING,
  }, {});

  invitation.associate = (models) => {
    // associations can be defined here
  };
  return invitation;
};
