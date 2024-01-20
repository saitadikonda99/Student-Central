const { pool } = require('../../config/db');

const viewUserReg = async (req, res) => {
    const { userId } = req.body;

    try {
        const response = await pool.query(
            `
            SELECT club.id AS club_id, club.club_name, club.club_logo, club.club_domain
            FROM club_reg
            JOIN club ON club_reg.club_id = club.id
            WHERE club_reg.user_id = ?`
            , [userId],  
        );
            
        return response[0];

    } catch (error) {
        return res.sendStatus(500);
    }
}

module.exports = {
    viewUserReg,
};