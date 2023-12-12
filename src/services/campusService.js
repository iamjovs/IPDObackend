const { AppError } = require("../middlewares/errorHandler");
const {Sequelize} = require('../config/database');
const Campus = require("../models/campusModel");

async function addCampus(campusName) {
  try {
    const findCampus = await Campus.findOne({
      where: {
        name: campusName,
      },
    });

    if (findCampus) {
      throw new AppError("Campus already exist", 400);
    }

    const newCampus = await Campus.create({ name: campusName });
    return newCampus;
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      throw new AppError("Have null value", 422);
    }

    throw error;
  }
}

async function editCampus(campusId, campusName) {
  const editCampus = await Campus.update(
    { name: campusName },
    {
      where: { id: campusId },
      returning: true,
    }
  );

  return editCampus;
}

async function deleteCampus(campusId) {
  const editCampus = await Campus.destroy({
    where: { id: campusId },
  });
}

async function getAllCampus() {
  const allCampus = await Campus.findAll();
  return allCampus;
}

module.exports = { addCampus, editCampus, deleteCampus, getAllCampus };
