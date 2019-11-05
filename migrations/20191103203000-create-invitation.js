import { INVITATION_TYPES } from '../helpers/invitation';

const TABLE_NAME = 'invitations';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      inviterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inviteeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM.apply(null, Object.keys(INVITATION_TYPES)),
        defaultValue: INVITATION_TYPES.pending,
      },
    });

    await queryInterface.addConstraint(TABLE_NAME, ['inviterId'], {
      type: 'FOREIGN KEY',
      name: 'FK_invitations_inviterId_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });

    await queryInterface.addConstraint(TABLE_NAME, ['inviteeId'], {
      type: 'FOREIGN KEY',
      name: 'FK_invitations_inviteeId_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: (queryInterface) => queryInterface.dropTable(TABLE_NAME),
};
