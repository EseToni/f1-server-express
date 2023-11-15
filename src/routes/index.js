const { Router } = require("express");
const DriverRouter = require("./driver-router.js");
const TeamRouter = require("./team-router.js");
const router = Router();

router.use('/drivers', DriverRouter);

router.use('/teams', TeamRouter);

module.exports = router;
