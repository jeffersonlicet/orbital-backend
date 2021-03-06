
import BaseController from './BaseController';

export default class UserController extends BaseController {
  async create(body) {
    try {
      const user = await this.userModel.create(body);
      return user.buildView();
    } catch (ex) {
      console.log(ex);
      throw new Error(`Can't register user`);
    }
  }

  async update(user, body) {
    try {
      return await this.userModel.update(body, { where: { id: user.id } });
    } catch (ex) {
      console.log(ex);
      throw new Error(`Can't update user`);
    }
  }

  async findById(id) {
    try {
      const user = await this.userModel.findOne({ where: { id } });
      return user.buildView();
    } catch (ex) {
      throw new Error(`Can't find user`);
    }
  }

  async findStateById(user, id) {
    try {
      const friend = await this.userModel.findOne({ where: { id } });

      if (!friend) {
        throw new Error('Can\'t find user');
      }

      const isFriend = await this.friendModel.findOne({
        where: {
          userId: user.id,
          friendId: friend.id,
        },
      });

      return { ...friend.buildView(), isFriend: !!isFriend };
    } catch (ex) {
      console.log(ex);
      // TODO: throw error
    }

    return {};
  }
}
