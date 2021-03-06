import express from 'express';

import errorHandler from './middlewares/errorHandler';
import authenticated from './middlewares/authenticated';

const friendsRoutes = ({
  friendsController,
}) => {
  const router = express.Router();

  router.get('/', authenticated, errorHandler(async (req, res) => {
    res.send(await friendsController.fetch(req.user, req.query));
  }));

  router.post('/remove', authenticated, errorHandler(async (req, res) => {
    res.send(await friendsController.remove(req.user, req.body.userId));
  }));

  return router;
};

export default friendsRoutes;
