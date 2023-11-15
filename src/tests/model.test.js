const { conn } = require('../db.js');
const { Team, Driver } = require('../db.js');

describe('Driver model', () => {
	beforeAll(async () => {
		await conn.sync({ force: true });
	});
	const driverObject = {
		name: 'Antonio',
		lastName: 'Perez',
		description: 'Best pilot ever desgined to win the formula one',
		nationality: 'Mexican',
		dateOfBirth: '1990-01-26',
		image:
			'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Drivers/2018/lewis-hamilton.png.transform/2col/image.png',
	};
	it('should create a new driver', async () => {
		const driver = await Driver.create(driverObject);
		expect(driver.id).toBeDefined();
		expect(driver.name).toBe('Antonio');
		expect(driver.lastName).toBe('Perez');
		expect(driver.description).toBe(
			'Best pilot ever desgined to win the formula one'
		);
		expect(driver.dateOfBirth).toBe('1990-01-26');
		expect(driver.nationality).toBe('Mexican');
	});
	it('should to be a unique driver with the same name and lastname', async () => {
		await expect(Driver.create(driverObject)).rejects.toThrow();
	});
	it('should not create a driver without any property empty', async () => {
		for (const key in driverObject) {
			await expect(
				Driver.create({ ...driverObject, [key]: '' })
			).rejects.toThrow();
		}
	});
});

describe('Team model', () => {
	beforeAll(async () => {
		await conn.sync({ force: true });
	});

	it('should create a new team', async () => {
		const team = await Team.create({
			name: 'Mercedes',
		});

		expect(team.id).toBeDefined();
		expect(team.name).toBe('Mercedes');
	});

	it('should not create a team without a name', async () => {
		await expect(Team.create({})).rejects.toThrow();
	});
});
