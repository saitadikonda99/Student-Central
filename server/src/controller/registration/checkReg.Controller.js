const { pool } = require('../../config/db');

const checkRegistration = async (req, res) => {
    const { userId, clubId } = req.query;

    try {
        const response = await pool.query(
            `
            SELECT * FROM club_reg 
            WHERE user_id = ? AND club_id = ?`,
            [userId, clubId]
        );

        if (response.length > 0) {
            res.json({ isRegistered: true });
        } else {
            res.json({ isRegistered: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed' });
    }
};

module.exports = {
    checkRegistration
};