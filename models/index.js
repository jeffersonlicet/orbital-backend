/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import Sequelize from 'sequelize';

import {
  development,
} from '../config/config';

import initialize from '../helpers/initializer';

const sequelize = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  port: development.port,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const initializeModels = () => {
  const registeredModels = [];

  initialize(__filename, __dirname, (file) => {
    registeredModels.push(require(file).default);
  });

  const models = {};

  registeredModels.forEach((model) => {
    models[model.name] = model.init(sequelize);
  });

  Object.keys(models).filter((k) => !!models[k].associate).forEach((k) => {
    models[k].associate(models);
  });

  return { models, sequelize };
};

export default initializeModels;
