const express = require('express');
const userController = require('../controllers/userController');
const passport = require("passport");
const router = express.Router();


router.get('/all', userController.getAllUsers);
router.put('/update', userController.editUser);


module.exports = router;