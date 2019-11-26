import express from 'express';
import validate from '../helpers/validation';
import UserEditionSchema from '../schemas/userEdition';

import errorHandler from './middlewares/errorHandler';
import authenticated from './middlewares/authenticated';

const userRoutes = ({
  userController,
}) => {
  const router = express.Router();

  router.get('/', authenticated, errorHandler((req, res) => {
    res.send({ user: req.user });
  }));

  router.put('/', authenticated, validate(UserEditionSchema), errorHandler(async (req, res) => {
    const user = await userController.update(req.user, req.body);
    res.send({ user });
  }));

  router.get('/:userId', authenticated, errorHandler(async (req, res) => {
    const state = await userController.findStateById(req.user, req.params.userId);
    res.send(state);
  }));

  return router;
};

export default userRoutes;
