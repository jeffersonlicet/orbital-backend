
import express from 'express';
import userRoutes from './routes/user';

import db from './db/db';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
