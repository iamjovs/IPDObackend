const userService = require("../services/userService");
const { AppError } = require("../middlewares/errorHandler");

exports.getAllUsers = async (req, res) => {
  try {
    const allUser = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      status: 200,
      message: "Users retrieved successfully",
      users: allUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",

    });
  }
};

exports.postRegisterUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, campusid } = req.body;

    const newUser = await userService.registerUser(
      firstname,
      lastname,
      email,
      password,
      campusid
    );

    
    res.status(200).json({
      success: true,
      status: 200,
      message: "Users retrieved successfully",
      data: { users: newUser },
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

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    

    const token = await userService.loginUser(email, password);
    res.json({ token });
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

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
