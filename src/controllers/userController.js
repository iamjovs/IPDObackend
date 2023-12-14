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

//edit user data
exports.editUser = async (req, res) => {
  const { id, firstname, lastname } = req.body;

  if (!id || !firstname || !lastname)
    return res.status(400).json({ message: "firstname and lastname required" });

  const editUser = await User.update(
    { firstname: firstname.toLowerCase(), lastname: lastname.toLowerCase() },
    {
      where: { id: id },
      returning: true,
    }
  ).catch((err) => {
    console.log("Error: ", err);
  });

  res.status(200).json({
    success: true,
    status: 200,
    message: "User updated",
  });
};

