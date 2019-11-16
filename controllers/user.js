
import BaseController from './BaseController';

export default class UserController extends BaseController {
  async create(body) {
    try {
      const user = await this.userModel.create(body);
      return user.buildView();
    } catch (ex) {
      throw new Error(`Can't register user`);
    }
  }

  async test() {
    console.log(await this.userModel.findAll());
    console.log(' inside controller ');
  }
}
