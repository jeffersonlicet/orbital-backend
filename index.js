
import express from 'express';

import initializeModels from './models';
import initializeRoutes from './routes';
import initializeControllers from './controllers';

const PORT = process.env.PORT || 8080;

const { models, sequelize } = initializeModels();
const controllers = initializeControllers({ models, sequelize });

const app = express();

initializeRoutes({ ...controllers, app });

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
