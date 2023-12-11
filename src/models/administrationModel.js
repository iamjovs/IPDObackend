const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Administration = sequelize.define("Administration", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  teching_plantilla: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
});


module.exports = Campus;