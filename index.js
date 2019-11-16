
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
}, async (username, password, done) => {
  try {
    const user = await models.user.findOne({ username }).exec();
    const passwordsMatch = await compare(password, user.password);

    if (passwordsMatch) {
      done(null, user);
    } else {
      done('Incorrect Username / Password');
    }
  } catch (error) {
    done(error);
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
