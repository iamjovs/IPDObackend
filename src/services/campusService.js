const Campus = require("../models/campusModel");

async function addCampus(campusName) {
    const newCampus = await Campus.create({ name: campusName });
    return newCampus;
  }

async function editCampus(campusId,campusName){
    const editCampus = await Campus.update( {name: campusName}, {
        where: {id: campusId},
        returning: true,
    });

    return editCampus;
}

async function deleteCampus(campusId){
    const editCampus = await Campus.destroy({
        where: {id: campusId},
    });
}

async function getAllCampus(){
    const allCampus = await Campus.findAll();
    return allCampus;
}

module.exports = { addCampus, editCampus, deleteCampus, getAllCampus };