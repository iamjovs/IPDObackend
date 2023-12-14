const express = require('express');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const logoutController = require('../controllers/logoutController');
const router = express.Router();


router.post('/register', registerController.postRegisterUser);
router.post('/login', loginController.postLogin);
router.post('/logout', logoutController.logout);

module.exports = router;