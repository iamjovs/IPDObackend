const express = require('express');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const logoutController = require('../controllers/logoutController');
const passport = require("passport");
const router = express.Router();


router.post('/register', registerController.postRegisterUser);
router.post('/login', loginController.postLogin);
router.post('/logout', logoutController.logout);

router.get('/all', passport.authenticate("jwt", { session: false }), userController.getAllUsers);

module.exports = router;