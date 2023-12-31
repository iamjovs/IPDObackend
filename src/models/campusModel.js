const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Campus = sequelize.define("Campus", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});




module.exports = Campus;