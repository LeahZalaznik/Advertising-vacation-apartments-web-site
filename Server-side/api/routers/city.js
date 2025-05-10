import express from 'express';

// Importing the controllers
import{
    add,
    getWeatherById,
    getAll
}from '../controllers/city.js';

const router = express.Router();

router.post('/', add);

router.get('/:id', getWeatherById);

router.get('/', getAll);

export default router;