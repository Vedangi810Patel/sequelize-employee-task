const { QueryTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");

const bcrypt = require("bcrypt");

const createEmployee = async (req, res) => {
    const {id, firstName, lastName, email, password, gender, hobby, dept_id } = req.body;

    // Check if all required fields are present
    if (!id || !firstName || !lastName || !email || !password || !dept_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email is already registered
    const existingEmployee = await sequelize.query(
        `SELECT email FROM employees WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
    );

    if (existingEmployee.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
    }

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sequelize.query(
            `INSERT INTO employees (emp_id, firstname, lastname, email, password, gender, hobby, dept_id) 
            VALUES ('${id}','${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${gender}', '${hobby}', ${dept_id})`,
            { type: QueryTypes.INSERT }
        );

        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = createEmployee;