const DriverController = require('../controllers/driver-controller');

class DriverHandler {
	
	static async getDrivers(req, res) {
		try {
			const { name } = req.query;
			if (name) {
				const drivers = await DriverController.getDriversByName(name);
				return res.status(200).json(drivers);
			}
			const drivers = await DriverController.getDrivers();
			return res.status(200).json(drivers);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
	static async getDriverById(req, res) {
		try {
			const driver = await DriverController.getDriverById(req.params.idDriver);
			return res.status(200).json(driver);
		} catch (error) {
			return res.status(404).json({ error: error.message });
		}
	}
	static async postDrivers(req, res) {
        try {
            const driver = await DriverController.postDrivers(req.body);
            return res.status(201).json(driver);
        }
         catch (error) {
            return res.status(400).json({ error: error.message });
        }
	}
	static async deleteDriverById(req,res){
		try{
			const driver = await DriverController.deleteDriverById(req.params.idDriver);
			return res.status(200).json(driver);
		}
		catch(error){
			return res.status(404).json({ error: error.message });
		}
	}
    }

module.exports = DriverHandler;
