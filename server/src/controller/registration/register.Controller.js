const { pool } = require('../../config/db');

const handleRegister = async (req, res) => {

    console.log(req.body);

    
    const {
        username,
        password,
        name,
        branch,
        year,
        address,
        phone,
        profile_pic
    } = req.body;
    
    try {
    
    const response = await pool.query(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, password]
    );
        
    const userId = response[0].insertId;

    await pool.query(
        `INSERT INTO user_details (user_id, name, branch, year, address, phone, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, name, branch, year, address, phone, profile_pic]
    );

    response  ? res.sendStatus(200) : res.sendStatus(500);
    
    } catch (error) {
    
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('Username already exists');
        } 
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
            return res.status(400).send('Fill all the fields');
        } 
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
            return res.status(400).send('Wrong data type');
        }

        return res.sendStatus(500);
    }
}

module.exports = {
    handleRegister
}