const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/all', userController.getAllUsers);
router.post('/register/user', userController.postRegisterUser);
router.post('/login', userController.postLogin);


module.exports = router;