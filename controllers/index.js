/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import initialize from '../helpers/initializer';

const initializeControllers = (deps) => {
  let controllers = {};
  initialize(__filename, __dirname, (file, filename) => {
    const Controller = require(file).default;
    controllers = { ...controllers, [`${filename}Controller`]: new Controller(deps) };
  });
  return controllers;
};

export default initializeControllers;
