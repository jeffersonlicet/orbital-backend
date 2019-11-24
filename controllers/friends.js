/* eslint-disable class-methods-use-this */

import BaseController from './BaseController';

export default class FriendsController extends BaseController {
  async fetch(user) {
    try {
      const friends = await user.getFriends();
      return friends.map((friend) => ({
        ...friend.buildView(),
        friendship: undefined,
      }));
    } catch (ex) {
      console.log(ex);
      throw new Error('Can\'t find friends user');
    }
  }

  async remove(user, friendId) {
    try {
      const query = (id1, id2) => this.friendModel.findOne({
        where: {
          friendId: id1,
          userId: id2,
        },
      });

      const [friendship, inverse] = await Promise.all([
        query(user.id, friendId),
        query(friendId, user.id),
      ]);

      if (friendship && inverse) {
        await Promise.all([
          friendship.destroy(),
          inverse.destroy(),
        ]);
      }
    } catch (ex) {
      console.log(ex);
      throw new Error('Can\'t find friends user');
    }
  }
}
