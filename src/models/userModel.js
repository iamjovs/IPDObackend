const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const Campus = require("./campusModel");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.beforeCreate((user) => {
  const saltRounds = 10;
  user.id = UUIDV4();
  user.password = bcrypt.hashSync(user.password, saltRounds);
});

User.belongsTo(Campus, {
  foreignKey: "campusid",
  allowNull: false,
});

module.exports = User;
