
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import JWTStrategy from 'passport-jwt';
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

passport.use(
  new JWTStrategy.Strategy(
    {
      jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (id, next) => {
      try {
        const user = await models.User.findOne({ where: { id } });
        if (user) {
          next(null, user);
        } else {
          throw new Error('Invalid token');
        }
      } catch (err) {
        next(err);
      }
    },
  ),
);

const app = express();

app.use(bodyParser.json());

initializeRoutes(app, { ...controllers });

app.use((err, req, res, next) => {
  console.log(err);
  res.status(422).json(err);
});

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
