import express from 'express';

const authRouter = ({
  userController,
}) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    userController.test();
    res.send('Auth base');
  });

  router.post('/signup', async (req, res) => {
    res.send(await userController.create(req.body));
  });

  return router;
};

export default authRouter;
