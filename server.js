const express = require("express");

const FetchAllEmployees = require('./controllers/employees_controller');
const CreateEmployee = require('./controllers/createEmployee');
const getEmployeeById = require('./controllers/employeeById');
const UpdateEmployee = require('./controllers/updateEmployee');
const DeleteEmployee = require('./controllers/deleteEmployee');
const EmployeeLogIn = require('./controllers/employeeLogIn');
const sequelize = require("./config/dbConfig");

const bodyParser = require("body-parser");
const EmployeeCrudRoutes = express.Router();

const app = express();

app.use(bodyParser.json());

EmployeeCrudRoutes.get('/fetchAllEmpoyees', FetchAllEmployees);

EmployeeCrudRoutes.get('/createEmployee', CreateEmployee);

EmployeeCrudRoutes.get('/getEmployeeById', getEmployeeById);

EmployeeCrudRoutes.get('/UpdateEmployee', UpdateEmployee);

EmployeeCrudRoutes.get('/DeleteEmployee', DeleteEmployee);

EmployeeCrudRoutes.get('/LogIn', EmployeeLogIn);

app.use(EmployeeCrudRoutes);

sequelize;
app.listen(3000);