const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        if (!city) {
          throw new AppError("The city you requested to delete is not present", StatusCodes.NOT_FOUND);
        }
        return city;
      } catch (error) {
        throw new AppError("Cannot delete city", StatusCodes.INTERNAL_SERVER_ERROR);
      }
}

module.exports = {
  createCity,
  deleteCity,
};
