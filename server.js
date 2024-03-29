const express = require("express");
const sequelize = require("./config/dbConfig");
const path = require('path');
const bodyParser = require("body-parser");
const EmployeeCrudRoutes = require("./routes/employeeCrudRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/public/assets", express.static(path.join(__dirname,"public", "assets")));

// EmployeeCrudRoutes.get('/fetchAllEmpoyees', controller.fetchAllEmployees);

// EmployeeCrudRoutes.get('/createEmployee', controller.createEmployee);

// EmployeeCrudRoutes.get('/getEmployeeById', controller.getEmployeeById);

// EmployeeCrudRoutes.get('/UpdateEmployee', controller.updateEmployee);

// EmployeeCrudRoutes.get('/DeleteEmployee', controller.deleteEmployee);

// EmployeeCrudRoutes.get('/LogIn', controller.EmployeeLogIn);

app.use(EmployeeCrudRoutes);

sequelize;
app.listen(3000);