const express = require("express");
const bodyParser = require("body-parser");
const campusRoutes = require("./src/routes/campusRouter");
const userRoutes = require("./src/routes/userRouter");
const sequelize = require('./src/config/database');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/campus", campusRoutes);
app.use("/user", userRoutes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables synced");
  })
  .catch((err) => {
    console.error("Error syncing tables:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
