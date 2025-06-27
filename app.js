import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/movie.routes.js';
import startDB from './config/database.js';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/api', movie.routes.js);

app.use((req, res) => {
	res.status(404).json({ errorMessage: 'Dirección no encontrada.' });
});

startDB().then(() => {
	app.listen(PORT, () => {
		console.log('Servidor corriendo en http://localhost:' + PORT);
	});
});
