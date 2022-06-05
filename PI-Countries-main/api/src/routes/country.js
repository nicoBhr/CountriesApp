const {Router} = require('express');
const {getCountriesByName, getCountriesById} = require('../controllers/country');

const router = Router();

router.get('/', getCountriesByName);

router.get('/:id', getCountriesById);

module.exports = router;

