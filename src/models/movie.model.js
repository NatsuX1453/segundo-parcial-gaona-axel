import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Movie = sequelize.define('movie', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	tittle: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	director: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	duration: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	genre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Movie;
