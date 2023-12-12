const User = require("../models/userModel");
const { generateJWT } = require("../middlewares/authMiddleware");
const { AppError } = require("../middlewares/errorHandler");
const {Sequelize} = require('../config/database');

async function getAllUsers() {
  const allUsers = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  return allUsers;
}

async function registerUser(firstname, lastname, email, password, campusid) {
  try {

    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new AppError("Email is already taken", 401);
    }

    const newUser = await User.create(
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        campusid: campusid,
      },
      {
        attributes: { exclude: ["password"] },
      }
    );

    return newUser;
  } catch (error) {
    
    if (error instanceof Sequelize.ValidationError) {
      throw new AppError("Have null value", 422);
    }

    throw error;
  }
}

async function loginUser(email, password) {
  try {

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error("Email is not registered");
      throw new AppError("Email is not registered", 401);
    }

    if (!user.validatePassword(password)) {
      console.error("Incorrect password");
      throw new AppError("Incorrect password", 401);
    }

    const token = generateJWT(user);
    return token;
  } catch (error) {
  
    throw error;
  }
}

module.exports = { getAllUsers, loginUser, registerUser };
