const express = require('express');
const controller = require('../controllers/employees_controller');
const middlwareAthentication = require('../middleware/middlewareAuthentication')
const EmployeeRoutes = express.Router();
const book_controller = require('../controllers/books_controller');
const bookRoutes = express.Router();


EmployeeRoutes.get('/fetchAllEmpoyees', middlwareAthentication, controller.fetchAllEmployees);

EmployeeRoutes.get('/createEmployee', controller.createEmployee);

EmployeeRoutes.get('/getEmployeeById', middlwareAthentication, controller.getEmployeeById);

EmployeeRoutes.get('/UpdateEmployee', middlwareAthentication, controller.updateEmployee);

EmployeeRoutes.get('/DeleteEmployee', middlwareAthentication, controller.deleteEmployee);

EmployeeRoutes.get('/LogIn', controller.EmployeeLogIn);

bookRoutes.get('/insertBooks', book_controller.createBook);

module.exports = EmployeeRoutes;