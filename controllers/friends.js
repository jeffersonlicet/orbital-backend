
import BaseController from './BaseController';

export default class FriendsController extends BaseController {
  async fetch({ id }) {
    try {
      const users = await this.userModel.findOne({
        where: {
          id,
        },
      });
      const friends = await users.getFriends();
      return friends.map((friend) => ({
        ...friend,
        friendShip: undefined,
      }));
    } catch (ex) {
      console.log(ex);
      throw new Error(`Can't find friends user`);
    }
  }
}
