module.exports = (sequelize, DataTypes) => {
  const invitation = sequelize.define('invitation', {
    id: DataTypes.STRING
  }, {});
  invitation.associate = function(models) {
    // associations can be defined here
  };
  return invitation;
};
