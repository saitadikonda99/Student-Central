const { pool } = require("../../config/db")

const viewProfile = async (userId) => {
    
    try {
        const response = await pool.query(
            `
            SELECT users.*, user_details.* 
            FROM users JOIN user_details 
            ON users.id = user_details.user_id 
            WHERE users.id = ?`,
            [userId]
        )
        
        return response[0].length > 0 ? response[0] : {message: "No user found"}
    } catch (error) {
        return error;
    }
}

module.exports = {
    viewProfile
}
