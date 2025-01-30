const express = require('express');

const { CityController, AirplaneController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');
const router = express.Router();

// /api/v1/cities POST
router.post('/', 
        CityMiddlewares.validateCreateRequest,
        CityController.createCity);

router.delete('/:id',CityController.deleteCity);
module.exports = router;
