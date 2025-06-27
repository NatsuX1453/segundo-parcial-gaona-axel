import express from 'express';
import {
	CreateMovie,
	deleteMovie,
	updateMovie,
	getMovieByID,
	getAllMovies,
} from '../controllers/movie.controllers.js';
const router = express.Router();

router.post('/movie', CreateMovie);
router.get('/movie/:id', getMovieByID);
router.get('/movie/', getAllMovie);
router.put('/movie/:id', updateMovie);
router.delete('/movie/:id', deleteMovies);

export default router;
