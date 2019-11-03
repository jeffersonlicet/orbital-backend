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
      inviter: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      invitee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM.apply(null, Object.keys(INVITATION_TYPES)),
        defaultValue: INVITATION_TYPES.pending,
      },
    });

    await queryInterface.addConstraint(TABLE_NAME, ['inviter'], {
      type: 'FOREIGN KEY',
      name: 'FK_inviter_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });

    await queryInterface.addConstraint(TABLE_NAME, ['invitee'], {
      type: 'FOREIGN KEY',
      name: 'FK_invitee_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: (queryInterface) => queryInterface.dropTable('invitations'),
};
