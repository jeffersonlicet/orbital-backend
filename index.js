
import express from 'express';

import initializeModels from './models';
import initializeRoutes from './routes';
import initializeControllers from './controllers';

const { models, sequelize } = initializeModels();
const controllers = initializeControllers({ models, sequelize });

const app = express();
initializeRoutes({ ...controllers, app });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
