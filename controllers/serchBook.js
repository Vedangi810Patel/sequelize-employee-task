const { QueryTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");


const fetchBookwithGenre = async (req, res) => {
    try {
        const users = await sequelize.query(
            `SELECT books.*, genres.genre_name FROM books
            INNER JOIN book_genres ON books.book_id = book_genres.book_id
            INNER JOIN genres ON book_genres.genre_id = genres.genre_id;`, { type: QueryTypes.SELECT }
        );

        res.status(200).json(users);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};


const fetchBookGenre = async (req, res) => {
    const { book_name } = req.body;
    try {
        const result = await sequelize.query(
            `SELECT books.*, genres.genre_name FROM books 
            INNER JOIN book_genres ON books.book_id = book_genres.book_id
            INNER JOIN genres ON book_genres.genre_id = genres.genre_id
            WHERE books.title = '${book_name}'`, { type: QueryTypes.SELECT }
        );
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        console.log("Error Detected", error);
    }
};


const fetchBookwithAuthor = async (req, res) => {
    try {
        const users = await sequelize.query(
            `SELECT books.*, authors.author_name FROM books
            INNER JOIN book_authors ON books.book_id = book_authors.book_id
            INNER JOIN authors ON book_authors.author_id = authors.author_id;`, { type: QueryTypes.SELECT }
        );

        res.status(200).json(users);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};


const fetchBookAuthor = async (req, res) => {
    const { book_name } = req.body;
    try {
        const result = await sequelize.query(
            `SELECT books.*, authors.author_name FROM books 
            INNER JOIN book_authors ON books.book_id = book_authors.book_id
            INNER JOIN authors ON book_authors.author_id = authors.author_id
            WHERE books.title = '${book_name}'`, { type: QueryTypes.SELECT }
        );
        res.status(200).json(result);
    } catch (error) {
        console.log("Error Detected", error);
    }
};


const fetchAll = async (req, res) => {
    const { search } = req.body;
    try {
        const result = await sequelize.query(
            // `SELECT b.title, a.author_name, g.genre_name FROM books b
            // INNER JOIN book_authors ba ON b.book_id = ba.book_id
            // INNER JOIN authors a ON ba.author_id = a.author_id
            // INNER JOIN book_genres bg ON b.book_id = bg.book_id
            // INNER JOIN genres g ON bg.genre_id = g.genre_id
            // WHERE b.title LIKE '%${search}%' OR
            // a.author_name LIKE '%${search}%' OR
            // g.genre_name LIKE '%${search}%';`, { type: QueryTypes.SELECT }
            `(SELECT author_name AS name, 'Author' AS type FROM authors
                WHERE author_name LIKE '%${search}%')
                UNION
                (SELECT title AS name, 'Book' AS type FROM books
                WHERE title LIKE '%${search}%')
                UNION
                (SELECT genre_name AS name, 'Genre' AS type FROM genres
                WHERE genre_name LIKE '%${search}%')` , {type : QueryTypes.SELECT}
        );
        res.status(200).json(result);
    } catch (error) {
        console.log("Error Detected", error);
    }
};



module.exports = {
    fetchBookwithGenre,
    fetchBookGenre,
    fetchBookwithAuthor,
    fetchBookAuthor,
    fetchAll
}