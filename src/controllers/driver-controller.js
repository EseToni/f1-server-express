const { Driver, Team } = require('../db.js');
const { Op } = require('sequelize');
const { getDriversApi, UUIDVALID } = require('../helpers/fetchApi.js');
const { findOutName } = require('../helpers/findOutName.js');

class DriverController {
	constructor() {}
	static async getDrivers() {
		try {
			const driversApi = await getDriversApi();
			const driversDb = await Driver.findAll();

			if (driversDb) {
				await Promise.all(
					driversDb.map(async (driver) => {
						const teams = await driver.getTeams();
						driver.dataValues.teams = teams.map((team) => team.name); // Guardar los nombres de los equipos en el objeto driver
						return driver;
					})
				);
			}
			const drivers = driversApi.concat(driversDb);

			return drivers;
		} catch (error) {
			throw Error(error.message);
		}
	}
	static async getDriverById(idDriver) {
		try {
			const driverApi = await getDriversApi(idDriver, null);
			if (driverApi) {
				return driverApi;
			}
			if (!UUIDVALID(idDriver)) {
				throw { error: 'No se encontró el conductor' };
			}
			const driverDb = await Driver.findByPk(idDriver);
			if (driverDb) {
				const teams = await driverDb.getTeams(); // Obtener solo el nombre del equipo y unirlos
				driverDb.dataValues.teams = teams.map((team) => team.name);
				return driverDb;
			}
			throw { error: 'No se encontró el conductor' };
		} catch (error) {
			throw Error(error.message);
		}
	}
	static async getDriversByName(name) {
		try {
			const driversApi = await getDriversApi(null, name);
			if (driversApi.length >= 15) return driversApi.slice(0, 15);

			const driversDb = await Driver.findAll({
				where: {
					name: {
						[Op.iLike]: `%${name}%`,
					},
				},
			});

			const driversWithTeams = await Promise.all(
				driversDb.map(async (driver) => {
					const teams = await driver.getTeams();
					driver.dataValues.teams = teams.map((team) => team.name);
					return driver;
				})
			);

			const drivers = driversApi.concat(driversWithTeams);
			if (drivers.length === 0)
				return { error: 'No se encontraron resultados' };

			return drivers.slice(0, 15);
		} catch (error) {
			throw Error(error.message);
		}
	}
	static async postDrivers(driver) {
		try {
			const existDriver = await findOutName(driver.name, driver.lastName);
			if (existDriver) return existDriver;
			const teams = await Promise.all(
				driver.teams.map(async (team) => {
					const teamName = team.trim();
					var newTeam = await Team.findOne({
						where: {
							name: {
								[Op.iLike]: `%${teamName}%`,
							},
						},
					});
					if (newTeam == null) {
						newTeam = await Team.create({
							name: teamName,
						});
					}
					return newTeam;
				})
			);

			const newDriver = await Driver.create(driver);

			await newDriver.addTeams(teams);
			const driverTeams = await newDriver.getTeams();
			const teamsNames = driverTeams.map((team) => team.name);
			newDriver.dataValues.teams = teamsNames;

			return newDriver;
		} catch (error) {
			throw Error(error.message);
		}
	}
	static async deleteDriverById(idDriver) {
		try {
			const driver = await Driver.findByPk(idDriver);

			if (!driver) throw { error: 'No se encontró el Piloto' };

			await driver.destroy();

			return { message: 'Piloto eliminado correctamente' };
		} catch (error) {
			throw Error(error.message);
		}
	}
}

module.exports = DriverController;
