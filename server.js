const express = require("express");

const controller = require('./controllers/employees_controller');
const sequelize = require("./config/dbConfig");

const bodyParser = require("body-parser");
const EmployeeCrudRoutes = express.Router();

const app = express();

app.use(bodyParser.json());

EmployeeCrudRoutes.get('/fetchAllEmpoyees', controller.fetchAllEmployees);

EmployeeCrudRoutes.get('/createEmployee', controller.createEmployee);

EmployeeCrudRoutes.get('/getEmployeeById', controller.getEmployeeById);

EmployeeCrudRoutes.get('/UpdateEmployee', controller.updateEmployee);

EmployeeCrudRoutes.get('/DeleteEmployee', controller.deleteEmployee);

EmployeeCrudRoutes.get('/LogIn', controller.EmployeeLogIn);

app.use(EmployeeCrudRoutes);

sequelize;
app.listen(3000);