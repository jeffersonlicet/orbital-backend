import express from 'express';

const userRoutes = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('User base');
  });

  router.get('/:userId', (req, res) => {
    res.send('User id base information');
  });

  return router;
};

export default userRoutes;
