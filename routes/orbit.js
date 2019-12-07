import express from 'express';

import errorHandler from './middlewares/errorHandler';
import authenticated from './middlewares/authenticated';

const orbitRoutes = ({
  orbitsController,
}) => {
  const router = express.Router();

  router.put('/', authenticated, errorHandler(async (req, res) => {
    const { latitude, longitude } = req.params;
    res.send(await orbitsController.update(req.user, latitude, longitude));
  }));

  return router;
};

export default orbitRoutes;
