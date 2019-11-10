import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Auth base');
});

router.post('/signup', (req, res) => {
  res.send('Sign up route');
});
