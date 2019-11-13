
import express from 'express';
import bodyParser from 'body-parser';

import initializeModels from './models';
import initializeRoutes from './routes';
import initializeControllers from './controllers';

const PORT = process.env.PORT || 8080;

const { models, sequelize } = initializeModels();
const controllers = initializeControllers({ models, sequelize });

const app = express();

app.use(bodyParser.json());

initializeRoutes(app, { ...controllers });

app.use((err, req, res, next) => {
  res.status(422).json(err);
});

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
