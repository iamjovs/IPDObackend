const express = require('express');
const userRoutes = require("./userRouter");
const campusRoutes = require("./campusRouter");
const passport = require('passport');

const router = express.Router();


router.use('/user',userRoutes);
router.use('/campus',passport.authenticate("jwt", { session: false }),campusRoutes);

module.exports = router;