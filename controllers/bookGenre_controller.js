const { QueryTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");

const createGenre = async (req, res) => {
    try {
        const { genre_id, genre_name } = req.body;

        // Check if all required fields are present
        if (!genre_id || !genre_name ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if email is already registered
        const existingGenre = await sequelize.query(
            `SELECT genre_name FROM genres WHERE genre_name = '${genre_name}'`,
            { type: QueryTypes.SELECT }
        );

        if (existingGenre.length > 0) {
            return res.status(400).json({ error: "Genre already exists" });
        }

        await sequelize.query(
            `INSERT INTO genres (genre_id, genre_name) 
            VALUES (${genre_id}, '${genre_name}')`,
            { type: QueryTypes.INSERT }
        );
        res.status(200).json({ message: "Genre Added successfully" });
    } catch (error) {
        console.error("Error adding genre:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const fetchAllGenres = async (req, res) => {
    try {
        const users = await sequelize.query(
            `SELECT * from genres`, { type: QueryTypes.SELECT }
        );

        res.status(200).json(users);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};



const getGenreByID = async (req, res) => {
    const { genre_id } = req.body;
    try {
        const result = await sequelize.query(
            `SELECT * FROM genres WHERE genre_id = '${genre_id}'`, { type: QueryTypes.SELECT }
        );
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        console.log("Error Detected", error);
    }
};


const updateGenre = async (req, res) => {
    const {
        genre_id,
        genre_name
    } = req.body;

    if (!genre_id || !genre_name ) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await sequelize.query(
            `UPDATE genres SET 
          genre_name = '${genre_name}'
          WHERE genre_id = ${genre_id}`,
            { type: QueryTypes.UPDATE }
        );
        res.status(200).json({ message: "Genre updated successfully" });
    } catch (error) {
        console.error("Error adding Genre:", error);
    }
};


const deleteGenre = async (req, res) => {
    const { genre_id } = req.body;

    try {
        const result = await sequelize.query(
            `DELETE FROM genres WHERE genre_id = ${genre_id}`, { type: QueryTypes.UPDATE }
        );

        if (result[1] === 0) {
            return res.status(404).json({
                error: "Genre not found"
            });
        }
        res.status(200).json({ message: "Genre deleted successfully" });
    } catch (error) {
        console.error("Error deleting Genre:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createGenre,
    fetchAllGenres,
    getGenreByID,
    updateGenre,
    deleteGenre
}