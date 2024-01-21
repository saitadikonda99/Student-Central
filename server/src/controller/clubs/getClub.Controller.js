const { pool } = require('../../config/db');

const handleClubReg = async (req, res) => {
        
        try {
            const response = await pool.query(
                `SELECT * FROM club`
            );
            return response[0];
        } catch (error) {
            return { message : 'Something went wrong'}
        }
    }

module.exports = {
    handleClubReg
};