import express from 'express';
import validate from '../helpers/validation';
import UserSchema from '../schemas/user';
import errorHandler from './middlewares/errorHandler';

const authRouter = ({
  userController,
}) => {
  const router = express.Router();

  router.get('/', errorHandler((req, res) => {
    res.send('Auth base');
  }));

  router.post('/signup', validate(UserSchema), errorHandler(async (req, res, next) => {
    const user = await userController.create(req.body);
    res.send({ user });
  }));


  return router;
};

export default authRouter;
