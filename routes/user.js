import express from 'express';
import passport from 'passport';
import errorHandler from './middlewares/errorHandler';

const userRoutes = ({
  userController,
}) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('User base');
  });

  router.get('/:userId', passport.authenticate('jwt', { session: false }), errorHandler(async (req, res) => {
    const user = await userController.findById(req.params.userId);
    res.send({ user });
  }));

  return router;
};

export default userRoutes;
