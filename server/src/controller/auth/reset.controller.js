const { pool } = require('../../config/db');
const jwt = require('jsonwebtoken');


const resetPassword = async (resetToken, password) => {
    
    const decodedToken = jwt.verify(resetToken, process.env.FORGOT_TOKEN_SECRET);

    const { username } = decodedToken;

    // check if username exists in the database
    const [userData, fields] = await pool.query(
        `
        SELECT * 
        FROM users
        WHERE username = ?`,
        [username]
    );

    if (!userData.length) return res.sendStatus(401);

    // update password

    try {
        const response = await pool.query(
            `
            UPDATE users
            SET password = ?
            WHERE username = ?`,
            [password, username]
        );

        if(response.affectedRows === 0) return res.sendStatus(401);
        
        return {
            reset_success: 'Password reset'
        }

    } catch (error) {
        console.error('Error updating password:', error.message);
        return {
            reset_error: 'Error updating password'
        }
    }

}


module.exports = {
    resetPassword
}