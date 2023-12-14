const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Get all data of users
exports.getAllUsers = async (req, res) => {
  //Get data of users excluding password
  const allUsers = await User.findAll({
    attributes: { exclude: ["password"] },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  res.status(200).json({
    success: true,
    status: 200,
    message: "Users retrieved successfully",
    users: allUsers,
  });
};
