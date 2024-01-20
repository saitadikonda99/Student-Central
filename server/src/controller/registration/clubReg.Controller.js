const { pool } = require('../../config/db');

const handleClubReg = async (req, res) => {
    
    const { userId, clubId } = req.body;

    try {
        const response = await pool.query(
            `INSERT INTO club_reg (user_id, club_id) VALUES (?, ?)`,
            [userId, clubId]
        );
        response  ? res.sendStatus(200) : res.sendStatus(500);       
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('Already registered');
        }
        return res.sendStatus(500);
    }
}

module.exports = {
    handleClubReg,
};