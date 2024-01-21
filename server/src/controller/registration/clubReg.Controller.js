const { pool } = require('../../config/db');

const handleClubReg = async (req, res) => {
    
    const { userId, clubId } = req.body;

    try {
        const response = await pool.query(
            `INSERT INTO club_reg (user_id, club_id) VALUES (?, ?)`,
            [userId, clubId]
        );
        return response ? { message : 'Registered Successfully' } : { message : 'Failed' };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { message : 'Already Registered to a Club' };
        }
        return { message : 'Failed' };
    }
}

module.exports = {
    handleClubReg
};