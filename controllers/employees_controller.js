const { QueryTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");
const profilepictureauthenticate = require('../middleware/profileMiddlewareAuthentication')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Insert New Emplolyee
const createEmployee = async (req, res) => {
    try{
        await profilepictureauthenticate(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: err });
            }

            if (!req.file) {
                return res.status(400).json({ error: "Error: No File Selected!" });
            }

            const { id, firstName, lastName, email, password, gender, hobby, dept_id } = req.body;
            const profile = req.file.filename;

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

    // password encryption
    const hashedPassword = await bcrypt.hash(password, 10);

 
        await sequelize.query(
            `INSERT INTO employees (emp_id, firstname, lastname, email, password, profile, gender, hobby, dept_id) 
            VALUES (${id}, '${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${profile}','${gender}', '${hobby}', ${dept_id})`,
            { type: QueryTypes.INSERT }
        );
    })
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


/* -------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */

//Fetch All Employee
const fetchAllEmployees = async (req, res) => {
    try {
        const users = await sequelize.query(
            `SELECT emp.emp_id, emp.firstname, emp.lastname, emp.email, emp.password, emp.gender, emp.hobby, dept.id dept_id, dept.dept_name FROM employees emp 
            LEFT JOIN departments dept ON emp.dept_id = dept.id`, { type: QueryTypes.SELECT }
        );

        res.status(200).json(users);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};


/* -------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */

//Fetch Employee By Id
const getEmployeeById = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await sequelize.query(
            `SELECT * FROM employees WHERE emp_id = ${id}`, { type: QueryTypes.SELECT }
        );
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        console.log("Error Detected", error);
    }
};


/* -------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */

//Update Employee Details
const updateEmployee = async (req, res) => {
    const {
      id,
      firstName,
      lastName,
      email,
      password,
      gender,
      hobbies,
      department_id,
    } = req.body;
  
    if (!id || !firstName || !lastName || !email || !password || !department_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      await sequelize.query(
        `UPDATE employees SET 
          firstname = '${firstName}',
          lastname = '${lastName}',
          email = '${email}',
          password = '${hashedPassword}',
          gender = '${gender}',
          hobby = '${hobbies}',
          dept_id = ${department_id}
          WHERE emp_id = ${id}`,
        { type: QueryTypes.UPDATE }
      );
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
};


/* -------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */

//Soft Delete Employee By Id
const deleteEmployee = async (req, res) => {
    const { id } = req.body;

    try {
        const result = await sequelize.query(
            `UPDATE employees SET soft_delete = 1 WHERE emp_id = ${id}`, { type: QueryTypes.UPDATE }
        );

        if (result[1] === 0) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}; 


/* -------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */

/* Log In and Token Generartion */ 
// const JWT_SECRET = "uisdw782783dfjkf";
const JWT_SECRET = "employee";

const EmployeeLogIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const existingEmployee = await sequelize.query(
        `SELECT email, password FROM employees WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
    );

    if (existingEmployee.length === 0) {
        return res.status(400).json({ error: "Email not found" });
    }

    const passwordMatch = await bcrypt.compare(
        password,
        existingEmployee[0].password
    );

    if (!passwordMatch) {
        return res.status(400).json({ error: "Incorrect password" });
    }

    if (passwordMatch) {
        const token = jwt.sign({ email: existingEmployee[0].email }, JWT_SECRET);
        return res.status(200).json({
            message: "Login successful",
            token: token,
        });
    }
};

/* -------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */


module.exports = {
    fetchAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    EmployeeLogIn
};