const express = require('express');
const controller = require('../controllers/employees_controller');
const middlwareAthentication = require('../middleware/middlewareAuthentication')
const EmployeeRoutes = express.Router();


EmployeeRoutes.get('/fetchAllEmpoyees', middlwareAthentication, controller.fetchAllEmployees);

EmployeeRoutes.get('/createEmployee', controller.createEmployee);

EmployeeRoutes.get('/getEmployeeById', middlwareAthentication, controller.getEmployeeById);

EmployeeRoutes.get('/UpdateEmployee', middlwareAthentication, controller.updateEmployee);

EmployeeRoutes.get('/DeleteEmployee', middlwareAthentication, controller.deleteEmployee);

EmployeeRoutes.get('/LogIn', controller.EmployeeLogIn);

module.exports = EmployeeRoutes;