const { QueryTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");

const createBookGenre = async (req, res) => {
    try {
        const { book_genre_id, book_id, genre_id } = req.body;

        // Check if all required fields are present
        if (!book_genre_id || !book_id || !genre_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if email is already registered
        const existingAuthor = await sequelize.query(
            `SELECT book_id,genre_id FROM book_genres WHERE book_genre_id = ${book_genre_id}`,
            { type: QueryTypes.SELECT }
        );

        if (existingAuthor.length > 0) {
            return res.status(400).json({ error: "Book with same Genre already exists" });
        }

        await sequelize.query(
            `INSERT INTO book_genres (book_genre_id, book_id, genre_id) 
            VALUES (${book_genre_id}, ${book_id}, ${genre_id})`,
            { type: QueryTypes.INSERT }
        );
        res.status(200).json({ message: "Book and Genre Added successfully" });
    } catch (error) {
        console.error("Error adding book and genre:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const fetchAllBookGenres = async (req, res) => {
    try {
        const users = await sequelize.query(
            // `SELECT book.*, gen.genrename from books book LEFT JOIN ON genres gen WHERE genre_name IN(SELECT genre_name FROM GENRES )`, { type: QueryTypes.SELECT }
            `SELECT books.*, genres.genre_name FROM books
            INNER JOIN book_genres ON books.book_id = book_genres.book_id
            INNER JOIN genres ON book_genres.genre_id = genres.genre_id`, { type: QueryTypes.SELECT }
        );

        res.status(200).json(users);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};



const getBookNameGenre = async (req, res) => {
    const { title } = req.body;
    try {
        const result = await sequelize.query(
            `SELECT books.*, genres.genre_name FROM books
            INNER JOIN book_genres ON books.book_id = book_genres.book_id
            INNER JOIN genres ON book_genres.genre_id = genres.genre_id WHERE books.title = '${title}'`, { type: QueryTypes.SELECT }
        );
        res.status(200).json(result);
    } catch (error) {
        console.log("Error Detected", error);
    }
};


const updateBookGenre = async (req, res) => {
    const {
        book_genre_id,
        book_id,
        genre_id
    } = req.body;

    if (!book_genre_id || !book_id || !genre_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await sequelize.query(
            `UPDATE book_genres SET 
            book_id = ${book_id},
            genre_id = ${genre_id}
            WHERE book_genre_id = ${book_genre_id}`,
            { type: QueryTypes.UPDATE }
        );
        res.status(200).json({ message: "Book Genre updated successfully" });
    } catch (error) {
        console.error("Error adding Author:", error);
    }
};


const deleteBookGenre = async (req, res) => {
    const { book_genre_id } = req.body;

    try {
        const result = await sequelize.query(
            `DELETE FROM book_genres WHERE book_genre_id = ${book_genre_id}`, { type: QueryTypes.DELETE }
        );

        if (result[1] === 0) {
            return res.status(404).json({
                error: "Book Genre not found"
            });
        }
        res.status(200).json({ message: "Book Genre deleted successfully" });
    } catch (error) {
        console.error("Error deleting Book Genre:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createBookGenre,
    fetchAllBookGenres,
    getBookNameGenre,
    updateBookGenre,
    deleteBookGenre
}