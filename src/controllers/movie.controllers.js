import Character from '../models/movie.model.js';

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

		const duration = Math.floor(duration);
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
