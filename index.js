
import express from 'express';

import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import initializeControllers from './controllers';

const controllers = initializeControllers({ a: true });

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
