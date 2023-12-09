
const authService = require('../services/campusService');

exports.addCampus = async (req, res) => {
    try{
        const {name} = req.body;
        const newCampus = await authService.addCampus(name.toLowerCase());
        res.status(200).json({
            sucess: true, 
            message: 'Campus added Successfully',
            name: newCampus});

    }catch(error){
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Add Internal Server Error' });
    }
};

exports.editCampus = async (req, res) => {
    try{
        const {id, name} = req.body;
        const editedCampus = await authService.editCampus( id, name.toLowerCase());
        res.status(200).json({
            sucess: true, 
            message: 'Campus Updated',
            editedCampus});
            
    }catch(error){
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Edit Internal Server Error' });
    }
};

exports.deleteCampus = async (req, res) => {
    try{
        const {id} = req.body;
        const deletedCampus = await authService.deleteCampus(id);
        res.status(200).json({
            success: true,
            message: 'Campus deleted successfully',
            campus: deletedCampus,
        });
            
    }catch(error){
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Delete Internal Server Error' });
    }
};

exports.getAllCampus = async (req, res) => {
    try {
        const allCampus = await authService.getAllCampus();
        res.status(200).json({
            success: true,
            message: 'Campuses retrieved successfully',
            campuses: allCampus,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error: Unable to fetch campuses' });
    }
};