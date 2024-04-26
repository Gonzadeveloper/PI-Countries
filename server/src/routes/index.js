const { Router } = require("express");
const router = Router();
const getCountryByIdController = require('../controllers/getCountryById')
const getCountryByNameController = require('../controllers/getCountryByName')
const getAllCountriesController = require('../controllers/getAllCountries');
const postActivity = require ('../controllers/postActivity')
const getAllActivitiesController = require('../controllers/getAllActivities');
router.get('/countries/id/:id', async (req, res) => {
    const countryId = req.params.id;
  
    try {
      const country = await getCountryByIdController(countryId);
  
      if (!country) {
        return res.status(404).json({ message: `No se encontró un país con el ID ${countryId}` });
      }
  
      res.json(country);
    } catch (error) {
      console.error('Error en la ruta al obtener el país:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

  router.get('/countries/name/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      const country = await getCountryByNameController(name);
      if (country) {
        res.status(200).json(country);
      } else {
        res.status(404).json({ message: `No se encontró un país con el nombre ${name}` });
      }
    } catch (error) {
      console.error('Error al buscar país por nombre:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

  router.get('/countries/All', async (req, res) => {
    try {
      const countries = await getAllCountriesController();
      res.json(countries);
    } catch (error) {
      console.error('Error en la ruta al obtener todos los países:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

  router.post('/countries/postActivities', postActivity);

  router.get('/countries/activities', getAllActivitiesController);

module.exports = router;
