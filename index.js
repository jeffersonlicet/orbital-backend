import express from 'express';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('orbital', 'root', 'rootroot', {
  host: 'localhost',
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
