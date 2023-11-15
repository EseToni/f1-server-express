const request = require('supertest');
const server = require('../server');
const DriverController = require('../controllers/driver-controller');

describe('DriverRouter', () => {
	describe('GET /', () => {
		it('should return a list of drivers', async () => {
			const response = await request(server).get('/drivers');
			expect(response.status).toBe(200);
			expect(response.body).toEqual(await DriverController.getDrivers());
		});
	});

	describe('GET /?name=', () => {
		it('should return a list of drivers by name', async () => {
			const response = await request(server).get('/drivers?name=lewis');
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				await DriverController.getDriversByName('lewis')
			);
		});
	});

	describe('GET /:idDriver', () => {
		it('should return a driver by id', async () => {
			const driver = await DriverController.getDrivers();
			const response = await request(server).get(`/drivers/${driver[0].id}`);
			expect(response.status).toBe(200);
			expect(response.body).toEqual(driver[0]);
		});
		it('should return a 404 if driver is not found', async () => {
			const response = await request(server).get('/drivers/999');
			expect(response.status).toBe(404);
		});
	});

	describe('POST /', () => {
		it('should create a new driver', async () => {
			const newDriver = {
				name: 'lewis',
				lastName: 'Porel',
				dateOfBirth: '1985-01-07',
				image:
					'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Drivers/2018/lewis-hamilton.png.transform/2col/image.png',
				description:
					'El mejor pilt de la formula uno que se vio en los tiemposssss',
				teams: ['merces', 'ferrari'],
				nationality: 'ingles',
			};
			const response = await request(server).post('/drivers').send(newDriver);
			expect(response.status).toBe(201);

			expect(response.body).toMatchObject(newDriver);
		});
		it('should return a 400 if driver is not created', async () => {
			const response = await request(server).post('/drivers').send({});
			expect(response.status).toBe(400);
		});
	});

});
