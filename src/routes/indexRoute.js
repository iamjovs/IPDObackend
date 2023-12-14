const express = require('express');
const userRoutes = require("./userRouter");
const campusRoutes = require("./campusRouter");
const authRoutes = require("./authRouter");
const passport = require('passport');

const router = express.Router();


router.use('/auth',authRoutes);
router.use('/user',passport.authenticate("jwt", { session: false }),userRoutes);
router.use('/campus',passport.authenticate("jwt", { session: false }),campusRoutes);

module.exports = router;