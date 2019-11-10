/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import initialize from '../helpers/initializer';

const initializeControllers = (deps) => {
  const controllers = [];
  initialize(__filename, __dirname, (file) => {
    const Controller = require(file).default;
    controllers.push(new Controller(deps));
  });
  return controllers;
};

export default initializeControllers;
