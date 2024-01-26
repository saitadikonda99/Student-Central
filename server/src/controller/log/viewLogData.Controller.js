const { pool } = require("../../config/db");


const viewLogData = async (userId) => {

    try {
        const response = await pool.query(
            `
            SELECT * FROM logs
            WHERE username = ?
            `,[userId]
        );

        return response[0];

    } catch (error) {
        return { message: 'Something Went Wrong!' };
    }
}

module.exports = {  
    viewLogData
};