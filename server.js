const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./config/dbConfig");
const EmployeeCrudRoutes = require("./routes/employeeCrudRoutes");

const app = express();

app.use(bodyParser.json());
app.use(EmployeeCrudRoutes);

sequelize;
app.listen(3000);