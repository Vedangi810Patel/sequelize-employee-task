const express = require('express');
const FetchAllEmployees = require('../controllers/employees_controller');
const CreateEmployee = require('../controllers/createEmployee');
const getEmployeeById = require('../controllers/employeeById');
const UpdateEmployee = require('../controllers/updateEmployee');
const DeleteEmployee = require('../controllers/deleteEmployee');
const EmployeeLogIn = require('../controllers/employeeLogIn');
const employeeRoutes = express.Router();

employeeRoutes.get('/', (req, res) => {
    res.send("Home Page!")
})

employeeRoutes.get('/fetchAllEmpoyees', FetchAllEmployees);

employeeRoutes.get('/createEmployee', CreateEmployee);

employeeRoutes.get('/getEmployeeById', getEmployeeById);

employeeRoutes.get('/UpdateEmployee', UpdateEmployee);

employeeRoutes.get('/DeleteEmployee', DeleteEmployee);

employeeRoutes.get('/LogIn', EmployeeLogIn);

// app.listen(3000);

module.exports = employeeRoutes;