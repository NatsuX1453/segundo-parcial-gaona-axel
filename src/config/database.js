import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
);

export const startDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Conectado a la base de datos con exito.');
		await sequelize.sync();
	} catch (err) {
		console.log('Hubo un problema al conectarse con la base de datos: ');
	}
};

export default startDB;
