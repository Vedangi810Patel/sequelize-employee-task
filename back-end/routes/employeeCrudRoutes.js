const express = require('express');
const controller = require('../controllers/employees_controller');
const middlwareAthentication = require('../middleware/middlewareAuthentication')
const book_controller = require('../controllers/book_store_controller');
const Routes = express.Router();
const author_controller = require('../controllers/author_controller');
const bookGenre_controller = require('../controllers/bookGenre_controller');
const serchBook = require('../controllers/serchBook');


Routes.get('/fetchAllEmpoyees', middlwareAthentication, controller.fetchAllEmployees);

Routes.get('/createEmployee', controller.createEmployee);

Routes.get('/getEmployeeById', middlwareAthentication, controller.getEmployeeById);

Routes.get('/UpdateEmployee', middlwareAthentication, controller.updateEmployee);

Routes.get('/DeleteEmployee', middlwareAthentication, controller.deleteEmployee);

Routes.get('/LogIn', controller.EmployeeLogIn);

Routes.post('/insertBooks', book_controller.createBook);

Routes.get('/fetchAllBooks', book_controller.fetchAllBooks);

Routes.get('/getBookByTitle', book_controller.getBookByTitle);

Routes.get('/updateBook', book_controller.updateBook);

Routes.get('/deleteBook', book_controller.deleteBook);

Routes.get('/createAuthor', author_controller.createAuthor);

Routes.get('/fetchAllAuthors', author_controller.fetchAllAuthors);

Routes.get('/fetchAuthorById', author_controller.getAuthorByID);

Routes.get('/updateAuthor', author_controller.updateAuthor);

Routes.get('/deleteAuthor', author_controller.deleteAuthor);

Routes.get('/createGenre', bookGenre_controller.createGenre);

Routes.get('/fetchAllGenres', bookGenre_controller.fetchAllGenres);

Routes.get('/fetchGenreByID', bookGenre_controller.getGenreByID);

Routes.get('/updateGenre', bookGenre_controller.updateGenre);

Routes.get('/deleteGenre', bookGenre_controller.deleteGenre);

Routes.get('/fetchBookwithGenre', serchBook.fetchBookwithGenre);

Routes.get('/fetchBookGenre', serchBook.fetchBookGenre);

Routes.get('/fetchBookwithAuthor', serchBook.fetchBookwithAuthor);

Routes.get('/fetchBookAuthor', serchBook.fetchBookAuthor);

Routes.get('/fetchAll', serchBook.fetchAll);


// Routes.get('/createBookGenre' , book_genre_controller.createBookGenre);

// Routes.get('/fetchAllBookGenre', book_genre_controller.fetchAllBookGenres);

// Routes.get('/getBookNameGenre', book_genre_controller.getBookNameGenre);

// Routes.get('/updateBookGenre', book_genre_controller.updateBookGenre);

// Routes.get('/deleteBookGenre', book_genre_controller.deleteBookGenre)

module.exports = {
    Routes
};