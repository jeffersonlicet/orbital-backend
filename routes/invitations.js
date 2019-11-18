import express from 'express';

import errorHandler from './middlewares/errorHandler';
import authenticated from './middlewares/authenticated';
import parseQuery from '../helpers/query';
import validate from '../helpers/validation';
import InvitationRequired from '../schemas/invitationRequired';

const invitationsRoutes = ({
  invitationsController,
}) => {
  const router = express.Router();

  router.get('/:type', authenticated, errorHandler(async (req, res) => {
    const query = parseQuery(req.query);
    res.send(await invitationsController.fetch(req.user, req.params.type, query));
  }));

  router.post('/invite', authenticated, errorHandler(async (req, res) => {
    if (!req.body.userId || req.body.userId === req.user.id) {
      throw new Error('Can\'t create invitation');
    }

    res.send(await invitationsController.create(req.user, req.body.userId));
  }));

  router.post('/accept', authenticated, validate(InvitationRequired), errorHandler(async (req, res) => {
    res.send(await invitationsController.accept(req.user, req.body.invitationId));
  }));

  router.post('/decline', authenticated, validate(InvitationRequired), errorHandler(async (req, res) => {
    res.send(await invitationsController.decline(req.user, req.body.invitationId));
  }));

  return router;
};

export default invitationsRoutes;
