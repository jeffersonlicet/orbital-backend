
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import initializeModels from './models';
import initializeRoutes from './routes';
import initializeControllers from './controllers';
import { compare } from './helpers/password';

const PORT = process.env.PORT || 8080;

const { models, sequelize } = initializeModels();
const controllers = initializeControllers({ models, sequelize });

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, next) => {
  try {
    const user = await models.User.scope('admin').findOne({ where: { email } });
    const passwordsMatch = await compare(password, user.password);

    if (passwordsMatch) {
      next(null, user.buildView());
    } else {
      next(new Error('Invalid password or email'));
    }
  } catch (error) {
    next(error);
  }
}));

const app = express();

app.use(bodyParser.json());

initializeRoutes(app, { ...controllers });

app.use((err, req, res, next) => {
  res.status(422).json(err);
});

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
