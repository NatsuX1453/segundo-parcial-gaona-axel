import Movie from '../models/movie.model.js';

export const CreateMovie = async (req, res) => {
	const { tittle, director, duration, genre, description } = req.body;

	try {
		if (tittle === undefined)
			return res.status(400).json({ message: 'El titulo no puede estar vacio' });
		if (director === undefined)
			return res.status(400).json({ message: 'El director no puede estar vacio' });
		if (duration === undefined)
			return res.status(400).json({ message: 'La duracion no puede estar vacia' });
		if (genre === undefined)
			return res.status(400).json({ message: 'El genero no puede estar vacio' });
		if (description === undefined)
			return res.status(400).json({ message: 'La descripción no puede estar vacio' });

		const durationInt = Math.floor(duration);
		if (duration < 0)
			return res
				.status(400)
				.json({ message: 'La duracion de la pelicula debe ser un entero' });

		if (typeof description !== 'string' || description.length < 10)
			return res
				.status(400)
				.json({ message: 'Descripción debe ser de al menos 10 caracteres' });

		const movieUnico = await Movie.findOne({ where: { tittle } });
		if (movieUnico !== null)
			return res.status(400).json({ message: 'Esa pelicula ya esta almacenada' });

		const movie = await Movie.create({
			tittle,
			director,
			duration,
			genre,
			description,
		});

		res.status(201).json({ message: 'Pelicula agregada exitosamente', movie });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getAllMovies = async (req, res) => {
	try {
		const movie = await Movie.findAll();

		if (movie.length > 0) return res.status(300).json(movie);

		return res.status(404).json({ errorMessage: 'La Base de Datos esta vacia.' });
	} catch (error) {
		res.status(500).json({ Message: error.message });
	}
};

export const getMovieByID = async (req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) return res.status(200).json(movie);

		return res.status(404).json({ errorMessage: 'Pelicula no encontrada.' });
	} catch (error) {
		res.status(500).json({ Message: error.message });
	}
};

export const updateMovie = async (req, res) => {
	const { tittle, director, duration, genre, description } = req.body;

	if (req.body) {
		for (let valor in req.body) {
			if (typeof valor === 'string') {
				req.body[valor] = req.body[valor].trim();
			}
		}
	}

	try {
		const movieUnico = await Movie.findOne({ where: { tittle } });
		if (movieUnico !== null)
			return res.status(400).json({ message: 'La pelicula ya esta agregada' });

		const [updated] = await Movie.update(tittle, director, duration, genre, description, {
			where: { id: req.params.id },
		});

		if (updated.length === 0)
			return res.status(404).json({ message: 'Pelicula no encontrada' });
		return res.status(200).json({ message: 'Pelicula actualizada exitosamente' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteMovie = async (req, res) => {
	try {
		const deleted = await Movie.destroy({ where: { id: req.params.id } });

		if (deleted > 0)
			return res.status(200).json({ Message: 'La pelicula ha sido eliminada.' });

		return res.status(404).json({ errorMessage: 'La pelicula no fue encontrada.' });
	} catch (error) {
		res.status(500).json({ Message: error.message });
	}
};
