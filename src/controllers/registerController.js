const express = require("express");
const User = require("../models/userModel");


exports.postRegisterUser = async (req, res) => {
 
    const { firstname, lastname, email, password, campusid, role } = req.body;

    //Checks email if already existed
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    }).catch((err) => {
      console.log("Error: ", err);
    });

    if (existingUser)
      return res
        .status(409)
        .json({ message: "User with email already exists!" });

    //User Creation and will return created user (oassword excluded) on json format
    const newUser = await User.create(
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        campusid: campusid,
        role: role,
      },
      {
        attributes: { exclude: ["password"] },
      }
    ).catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register user at the moment!" });
    });


    if (newUser) res.json({ message: "Thanks for registering" });
 

};
