/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import BaseController from './BaseController';

export default class OrbitsController extends BaseController {
  async update(user, latitude, longitude) {
    const orbit = await this.orbitModel.findOne({ where: { userId: user.id } });

    if (orbit) {
      await orbit.destroy();
    }

    const point = { type: 'Point', coordinates: [latitude, longitude] };

    const newOrbit = await this.orbitModel.create({
      userId: user.id,
      position: point,
    });

    return newOrbit;
  }
}
