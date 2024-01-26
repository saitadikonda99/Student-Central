const { pool } = require("../../config/db");


const getLogData = async (req, res) => {
    try {
        const response = await pool.query(
            `
            SELECT * FROM logs
            WHERE logout_time IS NULL
            `
        );

        return response[0];

    } catch (error) {
        return { message: 'Something Went Wrong!' };
    }
}

module.exports = {  
    getLogData
};