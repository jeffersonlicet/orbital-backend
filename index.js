import express from 'express';
import { Sequelize } from 'sequelize';
import {
  development,
} from './config/config';

const sequelize = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  port: development.port,
  dialect: 'mysql',
});

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
