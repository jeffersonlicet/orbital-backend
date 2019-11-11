import express from 'express';
import validate from '../helpers/validation';
import UserSchema from '../schemas/user';

const authRouter = ({
  userController,
}) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    userController.test();
    res.send('Auth base');
  });

  router.post('/signup', validate(UserSchema), async (req, res) => {
    res.send(await userController.create(req.body));
  });

  return router;
};

export default authRouter;
