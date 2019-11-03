module.exports = (sequelize, DataTypes) => {
  const invitation = sequelize.define('invitation', {
    id: DataTypes.STRING,
  }, {});

  invitation.associate = (models) => {
  };

  return invitation;
};
