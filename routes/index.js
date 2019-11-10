/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import initialize from '../helpers/initializer';

const initializeRoutes = ({ app, ...deps }) => {
  const routes = [];
  initialize(__filename, __dirname, (file, filename) => {
    const route = require(file).default;
    app.use(`/${filename}`, route(deps));
  });
  return routes;
};

export default initializeRoutes;
