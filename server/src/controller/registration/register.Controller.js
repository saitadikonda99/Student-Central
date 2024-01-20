const { pool } = require('../../config/db');

const handleRegister = async (req, res) => {

    console.log(req);

    const {
        username,
        password,
        name,
        branch,
        year,
        address,
        phone,
        profile_pic
    } = req;

    if (!username || !password || !name || !branch || !year || !address || !phone || !profile_pic) {
        return { message : 'Insufficient data' };
    }
    
    try {
    
    const response = await pool.query(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, password]
    );
        
    const userId = response[0].insertId;

    const response2 = await pool.query(
        `INSERT INTO user_details (user_id, name, branch, year, address, phone, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, name, branch, year, address, phone, profile_pic]
    );

    return response && response2  ? { message : 'Registered' } : { message : 'Failed' };
    
    } catch (error) {
    
        await pool.query(
            `DELETE FROM users WHERE username = ?`,
            [username]
        );

        if (error.code === 'ER_DUP_ENTRY') {
            return { message : 'Username already exists' };
        } 
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
            return { message : 'Wrong data type' };
        } 
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
            return { message : 'Wrong data type' };
        }

        return { message : 'Failed' };
    }
}

module.exports = {
    handleRegister
}