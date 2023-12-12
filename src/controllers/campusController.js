const { AppError } = require("../middlewares/errorHandler");
const campusService = require("../services/campusService");

exports.addCampus = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCampus = await campusService.addCampus(name.toLowerCase());
    res.status(200).json({
      sucess: true,
      message: "Campus added Successfully",
      name: newCampus,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: false,
        code: error.statusCode,
        message: error.message,
      
      });
    }

    return res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",

    });
  }
};

exports.editCampus = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    if (!name) {
      throw new AppError("name should not be null", 400);
    }

    if (!id) {
      throw new AppError("id should not be null", 400);
    }

    const editedCampus = await campusService.editCampus(id, name.toLowerCase());
    res.status(200).json({
      sucess: true,
      message: "Campus Updated",
      editedCampus,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
  }
};

exports.deleteCampus = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw new AppError("id should not be null", 400);
    }

    const deletedCampus = await campusService.deleteCampus(id);
    res.status(200).json({
      success: true,
      message: "Campus deleted successfully",
      campus: deletedCampus,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
  }
};

exports.getAllCampus = async (req, res) => {
  try {
    const allCampus = await campusService.getAllCampus();
    res.status(200).json({
      success: true,
      message: "Campuses retrieved successfully",
      campuses: allCampus,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
  }
};
