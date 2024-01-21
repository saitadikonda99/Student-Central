const { pool } = require('../../config/db');

const handleClubReg = async (req, res) => {
    const { userId, clubId, why, resume_link, preknowledge } = req.body;

    try {
        const response = await pool.query(
            `
            INSERT INTO club_reg (user_id, club_id, why, resume_link, preknowledge)
            VALUES (?, ?, ?, ?, ?)`,
            [userId, clubId, why, resume_link, preknowledge]
        );
            
        return { message: 'Registered Successfully'}
        
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { message: 'Already Registered to a Club' };
        }
        return { message: 'Failed' };
    }
};

module.exports = {
    handleClubReg
};
