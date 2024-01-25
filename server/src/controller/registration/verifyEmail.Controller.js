const { pool } = require('../../config/db');
const jwt = require('jsonwebtoken');


const handleVerifyEmail = async (req, res) => {

    const { token } = req.params;

    try {
        
        const decoded = jwt.verify(token, process.env.VERIFY_TOKEN_SECRET);
        const username = decoded.username;

        const response = await pool.query(
            `
            UPDATE user
            SET is_verified = 1
            WHERE username = ?`,
            [username]
        );

        return response[0].length > 0 ? { message: 'Verified Successfully' } : { message: 'Failed' };

    } catch (error) {
        return { message: 'Something Went Wrong!' };
    }
}   