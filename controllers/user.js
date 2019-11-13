
import BaseController from './BaseController';

export default class UserController extends BaseController {
  async create(body) {
    try {
      const user = await this.userModel.create(body);
      return { id: user.id };
    } catch (ex) {
      return ex;
    }
  }

  async test() {
    console.log(await this.userModel.findAll());
    console.log(' inside controller ');
  }
}
