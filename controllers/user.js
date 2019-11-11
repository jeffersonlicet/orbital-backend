
import BaseController from './BaseController';

export default class UserController extends BaseController {
  async create(body) {
    try {
      return await this.userModel.create(body);
    } catch (ex) {
      return ex;
    }
  }

  async test() {
    console.log(await this.userModel.findAll());
    console.log(' inside controller ');
  }
}
