const { getDriversApi } = require('./fetchApi');

const findOutName = async (name, lastName) => {
	try {
		const drivers = await getDriversApi();
		const driver = drivers.find(
			(driver) =>
				driver.name.toLowerCase() === name.toLowerCase() &&
				driver.lastName.toLowerCase() === lastName.toLowerCase()
		);
		if (driver) return { error: 'Ya existe un piloto con ese nombre y apellido' };
	} catch (error) {
		return null;
	}
};

module.exports = { findOutName };

