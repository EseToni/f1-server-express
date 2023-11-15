const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Driver',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 20],
					isUniqueNameAndLastName(value) {
						const lowercaseName = value.toLowerCase();
						const lowercaseLastName = this.getDataValue('lastName').toLowerCase();

						return sequelize.models.Driver.findOne({
							where: {
								name: {
									[Op.iLike]: lowercaseName,
								},
								lastName: {
									[Op.iLike]: lowercaseLastName,
								},
							},
						}).then((driver) => {
							if (driver) {
								throw Error(
									'Ya existe un conductor con el mismo nombre y apellido'
								);
							}
						});
					},
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 20],
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					len: [20, 500],
				},
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isUrl: true,
				},
			},
			nationality: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 30],
				},
			},
			dateOfBirth: {
				type: DataTypes.DATEONLY,
				allowNull: false,
				validate: {
					isDate: true,
				},
			},
		},
		{
			timestamps: false,
		}
	);
};
