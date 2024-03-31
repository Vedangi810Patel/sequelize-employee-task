const { QueryTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");

const createAuthor = async (req, res) => {
    try {
        const { author_id, author_name, biography } = req.body;

        // Check if all required fields are present
        if (!author_id || !author_name || !biography) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if email is already registered
        const existingAuthor = await sequelize.query(
            `SELECT author_name FROM authors WHERE author_name = '${author_name}'`,
            { type: QueryTypes.SELECT }
        );

        if (existingAuthor.length > 0) {
            return res.status(400).json({ error: "Author already exists" });
        }

        await sequelize.query(
            `INSERT INTO authors (author_id, author_name, biography) 
            VALUES (${author_id}, '${author_name}', '${biography}')`,
            { type: QueryTypes.INSERT }
        );
        res.status(200).json({ message: "Auhor Added successfully" });
    } catch (error) {
        console.error("Error adding author:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const fetchAllAuthors = async (req, res) => {
    try {
        const users = await sequelize.query(
            `SELECT * from authors`, { type: QueryTypes.SELECT }
        );

        res.status(200).json(users);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};



const getAuthorByID = async (req, res) => {
    const { author_id } = req.body;
    try {
        const result = await sequelize.query(
            `SELECT * FROM authors WHERE author_id = '${author_id}'`, { type: QueryTypes.SELECT }
        );
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        console.log("Error Detected", error);
    }
};


const updateAuthor = async (req, res) => {
    const {
        author_id,
        author_name,
        biography
    } = req.body;

    if (!author_id || !author_name || !biography) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await sequelize.query(
            `UPDATE books SET 
          author_name = '${author_name}',
          biography = '${biography}',
          WHERE author_id = ${author_id}`,
            { type: QueryTypes.UPDATE }
        );
        res.status(200).json({ message: "Author updated successfully" });
    } catch (error) {
        console.error("Error adding Author:", error);
    }
};


const deleteAuthor = async (req, res) => {
    const { author_id } = req.body;

    try {
        const result = await sequelize.query(
            `DELETE FROM authors WHERE author_id = ${author_id}`, { type: QueryTypes.UPDATE }
        );

        if (result[1] === 0) {
            return res.status(404).json({
                error: "Author not found"
            });
        }
        res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
        console.error("Error deleting Author:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createAuthor,
    fetchAllAuthors,
    getAuthorByID,
    updateAuthor,
    deleteAuthor
}