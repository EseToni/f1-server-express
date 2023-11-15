const TeamHandler = require('../handlers/team-handler');
const { Router } = require('express');

const TeamRouter = Router();

TeamRouter.get('/', TeamHandler.getTeams);

module.exports = TeamRouter;
