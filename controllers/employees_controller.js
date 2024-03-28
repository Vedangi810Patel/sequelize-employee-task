const { QueryTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");

const fetchAllEmployees = async (req, res) => {
    try {
        const users = await sequelize.query(
            `SELECT firstName, lastName, email, password, gender, hobby, departments.dept_name FROM employees 
        LEFT JOIN departments ON employees.dept_id = departments.id`, { type: QueryTypes.SELECT }
        );

        res.status(200).json(users);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};


module.exports = fetchAllEmployees;