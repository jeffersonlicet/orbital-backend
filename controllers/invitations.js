/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import BaseController from './BaseController';
import { INVITATION_TYPES } from '../helpers/invitation';

export default class InvitationsController extends BaseController {
  async fetch(user, type, { offset, count }) {
    const typesMap = {
      sent: user.getInvitationsSent,
      received: user.getInvitationsReceived,
    };

    try {
      const method = typesMap[type];

      if (!method) {
        throw new Error('Invalid filter');
      }

      return await method.call(
        user,
        { limit: count, offset, through: { where: { status: 'pending' } } },
      );
    } catch (ex) {
      console.log(ex);
      throw new Error('Can\'t fetch user invitations');
    }
  }

  async create(user, id) {
    try {
      let invitation = await this.invitationModel.findOne({
        where: { inviterId: user.id, inviteeId: id },
      });

      if (!invitation) {
        invitation = await this.invitationModel.create({ inviterId: user.id, inviteeId: id });
      }

      return invitation;
    } catch (ex) {
      console.log(ex);
      throw new Error('Can\'t create invitation');
    }
  }

  async decline(id) {
    try {
      const invitation = this.invitationModel.findOne({ where: { id } });

      if (invitation && invitation.status === INVITATION_TYPES.pending) {
        await invitation.update({ status: INVITATION_TYPES.rejected });
      }

      return id;
    } catch (ex) {
      console.log(ex);
      throw new Error('Can\'t decline invitation');
    }
  }

  async accept(user, id) {
    try {
      const invitation = await this.invitationModel.findOne({ where: { id, inviteeId: user.id } });
      if (invitation && invitation.status === INVITATION_TYPES.pending) {
        await this.friendModel.create({
          userId: invitation.inviterId,
          friendId: invitation.inviteeId,
        });

        await this.friendModel.create({
          userId: invitation.inviteeId,
          friendId: invitation.inviterId,
        });

        await invitation.update({ status: INVITATION_TYPES.accepted });
      } else {
        throw new Error('invalid invitation');
      }

      return {};
    } catch (ex) {
      console.log(ex);
      throw new Error('Can\'t accept invitation');
    }
  }
}
