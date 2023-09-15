const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models/index");
const userRoutes = require("./users/userRoutes");

const app = express();
const port = 3000;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Touraxis Task Api is running on http://localhost:${port}`);
  });
});
