const TABLE_NAME = 'invitations';

module.exports = {
  up: async (queryInterface) => {
    const [[adhara, baten]] = await queryInterface.sequelize.query('SELECT id from users;');
    await queryInterface.bulkInsert(TABLE_NAME, [{
      createdAt: new Date(),
      updatedAt: new Date(),
      inviter: adhara.id,
      invitee: baten.id,
    }]);
  },

  down: ({ bulkDelete }) => bulkDelete(TABLE_NAME, null, {}),
};
