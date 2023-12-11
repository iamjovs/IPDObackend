const userService = require("../services/userService");
const { AuthenticationError, ServiceError } = require('../services/errorType');

exports.getAllUsers = async (req, res) => {
  try {
    const allUser = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users: allUser,
    });
  } catch (error) {
    console.error(error.message);
    if (error instanceof AuthenticationError) {
      res.status(404).json({ code: error.code,error: error.message});
    }
  }
};

exports.postRegisterUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role, campusId } = req.body;
    const newUser = await userService.registerUser(
      firstname,
      lastname,
      email,
      password,
      campusId
    );
    res.json(newUser);
  } catch (error) {
    console.error(error);
    if (error instanceof AuthenticationError) {
      res.status(409).json({ error: error.message});
    }
  }
};

exports.postRegisterCampusAdmin = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role, campusId } = req.body;
    const newUser = await userService.registerUser(
      firstname,
      lastname,
      email,
      password,
      campusId
    );
    res.json(newUser);
  } catch (error) {
    console.error(error);
    if (error instanceof AuthenticationError) {
      res.status(409).json({ error: error.message});
    }
    
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    console.error("Error in postLogin:", error);
    if (error instanceof AuthenticationError) {
      res.status(401).json({ error: error.message});
    } else if (error instanceof ServiceError) {
      res.status(500).json({ error: error.message});
    } else {
      res.status(500).json({ error: error.message});
    }
  }
};



exports.logout = (req, res) => {
  // Implement logout logic (if needed)
  res.json({ message: "Logout successful" });
};
