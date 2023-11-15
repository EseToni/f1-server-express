const { Router } = require('express');
const DriverHandler = require('../handlers/driver-handler');

const DriverRouter = Router();

DriverRouter.get('/', DriverHandler.getDrivers);

DriverRouter.get('/:idDriver', DriverHandler.getDriverById);

DriverRouter.post('/', DriverHandler.postDrivers);

DriverRouter.delete('/:idDriver', DriverHandler.deleteDriverById);


module.exports = DriverRouter;
