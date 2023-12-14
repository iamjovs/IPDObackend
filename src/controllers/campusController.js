const Campus = require("../models/campusModel");

exports.addCampus = async (req, res) => {
  const { name } = req.body;
  const newCampus = await Campus.create({ name: name.toLowerCase() }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
  res.status(200).json({
    success: true,
    status: 200,
    message: "Campus added Successfully",
    name: newCampus,
  });
};

exports.editCampus = async (req, res) => {
  const { id, name } = req.body;

  if (!name || !id) return res.status(400).json({ message: "Campus required" });

  const editCampus = await Campus.update(
    { name: name.toLowerCase() },
    {
      where: { id: id },
      returning: true,
    }
  ).catch((err) => {
    console.log("Error: ", err);
  });

  res.status(200).json({
    success: true,
    status: 200,
    message: "Campus Updated",
    editedCampus,
  });
};

exports.deleteCampus = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Invalid Request NULL" });

  const deletCampus = await Campus.destroy({
    where: { id: id },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  res.status(200).json({
    success: true,
    status: 200,
    message: "Campus deleted successfully",
    campus: deletedCampus,
  });
};

exports.getAllCampus = async (req, res) => {
  const allCampus = await Campus.findAll().catch((err) => {
    console.log("Error: ", err);
  });

  res.status(200).json({
    success: true,
    status: 200,
    message: "Campuses retrieved successfully",
    campuses: allCampus,
  });
};
