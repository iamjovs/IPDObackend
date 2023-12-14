const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (!userWithEmail)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });

  if (!userWithEmail.validatePassword(password))
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });

  const jwtToken = jwt.sign(
    {
      id: userWithEmail.id,
      email: userWithEmail.email,
      role: userWithEmail.role,
    },
    process.env.ACCESS_JWT_SECRET
  );

  res.json({ message: "Welcome Back!", token: jwtToken });
};
