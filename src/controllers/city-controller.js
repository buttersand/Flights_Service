const { StatusCodes } = require("http-status-codes");

const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST : /cities
 * req-body {name: 'London'}
 */
async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteCity(req, res) {
  try {
    const city = await CityService.deleteCity(req.params.id);
    SuccessResponse.data = city;
    return res.status(StatusCodes.NO_CONTENT).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateCity(req, res) {
  try {
    const city = await CityService.updateCity(req.params.id, {
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    ErrorResponse.error = error.message || "An error occurred";
    return res.status(statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  deleteCity,
  updateCity,
};
