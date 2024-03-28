const { QueryTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const getEmployeeById = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await sequelize.query(
      `SELECT * FROM employees WHERE emp_id = ${id}`,{ type: QueryTypes.SELECT }
    );
    res.status(200).json({
      data: result,
    });
    } catch (error) {
        console.log("Error Detected", error);
    }
};

module.exports = getEmployeeById;