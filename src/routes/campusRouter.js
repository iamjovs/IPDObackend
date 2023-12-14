const express = require('express');
const campusController = require('../controllers/campusController');


const router = express.Router();

router.post('/add', campusController.addCampus);
router.post('/edit', campusController.editCampus);
router.post('/delete', campusController.deleteCampus);
router.get('/all', campusController.getAllCampus);


module.exports = router;