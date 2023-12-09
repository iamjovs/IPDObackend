const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const campusRoutes = require('./src/routes/campusRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use('/campus', campusRoutes);


sequelize.sync({ force: true }).then(() => {
    console.log('Tables synced');
  }).catch(err => {
    console.error('Error syncing tables:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

