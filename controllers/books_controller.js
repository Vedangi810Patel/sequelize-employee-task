const { QueryTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");
const jwt = require("jsonwebtoken");

const createBook = async (req, res) => {
    try{
        const {book_id, title, book_description, publish_year, quantity_available} = req.body;

    // Check if all required fields are present
    if (!book_id || !title || !book_description || !publish_year || !quantity_available) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email is already registered
    const existingBook= await sequelize.query(
        `SELECT title FROM employees WHERE title = '${title}'`,
        { type: QueryTypes.SELECT }
    );

    if (existingEmployee.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
    }

    // password encryption
    const hashedPassword = await bcrypt.hash(password, 10);

    await sequelize.query(
        `INSERT INTO employees (emp_id, firstname, lastname, email, password, profile, gender, hobby, dept_id) 
        VALUES (${id}, '${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${profile}','${gender}', '${hobby}', ${dept_id})`,
        { type: QueryTypes.INSERT }
    );
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createBook
}