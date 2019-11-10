export default class BaseController {
  constructor({ models, sequelize }) {
    Object.keys(models).forEach((modelName) => {
      this[`${modelName.toLowerCase()}Model`] = models[modelName];
    });
    this.sequelize = sequelize;
  }
}
