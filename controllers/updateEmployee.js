const { QueryTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const bcrypt = require("bcrypt");

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

module.exports = updateEmployee;