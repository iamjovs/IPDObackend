const express = require("express");
const bodyParser = require("body-parser");
const campusRoutes = require("./src/routes/campusRouter");
const api= require("./src/routes/indexRoute");
const sequelize = require('./src/config/database');
const cors = require('cors');
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;

require('dotenv').config();

require("./src/middlewares/passport");

require("./src/models/userModel");
const middlewares = require("./src/middlewares/errorHandler");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"))
app.use(helmet());
app.use(cors());
app.use(express.json());





app.use("/api/v1", api);
app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

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
