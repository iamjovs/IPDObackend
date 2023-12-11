const User = require("../models/userModel");
const { generateJWT } = require("../middlewares/authMiddleware");
const { AuthenticationError, ServiceError } = require('./errorType');

async function getAllUsers() {
  const allUsers = await User.findAll();
  return allUsers;
}

async function registerUser(firstname, lastname, email, password, campusid) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AuthenticationError("Email already exists. Please use a different email address.");
  }

  const newUser = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    role: "user",
    campusid: campusid
  });
  return newUser;
}


async function loginUser(email, password) {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error("Email not found");
      throw new AuthenticationError("Email is not registered");
    }

    if (!user.validatePassword(password)) {
      console.error("Invalid password");
      throw new AuthenticationError("Invalid password");
    }

    const token = generateJWT(user);
    return token;
  } catch (error) {
    console.error("Error in loginUser:", error);
  
    if (error instanceof AuthenticationError || error instanceof ServiceError) {
      throw error;
    } else {
      throw new ServiceError("Error during login process");
    }
  }
}

module.exports = { getAllUsers, loginUser, registerUser };
