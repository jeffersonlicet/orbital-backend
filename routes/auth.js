import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import validate from '../helpers/validation';
import UserCreationSchema from '../schemas/userCreation';
import UserLoginSchema from '../schemas/userLogin';

import errorHandler from './middlewares/errorHandler';

const authRouter = ({
  userController,
}) => {
  const router = express.Router();

  router.get('/', errorHandler((req, res) => {
    res.send('Auth base');
  }));

  router.post('/signup', validate(UserCreationSchema), errorHandler(async (req, res) => {
    const user = await userController.create(req.body);
    res.send({ user });
  }));

  router.post('/login', validate(UserLoginSchema), errorHandler(async (req, res) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        res.status(400).json({
          message: 'Something is not right',
          user,
        });
      } else {
        req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            res.send(loginError);
          }
          const token = jwt.sign(user.id, process.env.JWT_SECRET);
          return res.json({ user, token });
        });
      }
    })(req, res);
  }));


  return router;
};

export default authRouter;
