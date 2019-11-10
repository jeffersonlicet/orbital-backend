
import BaseController from './BaseController';

export default class UserController extends BaseController {
  create(body) {
  }

  async test() {
    console.log(await this.userModel.findAll());
    console.log(' inside controller ');
  }
}
