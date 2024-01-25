const { pool } = require("../../config/db");



const handleLogIn = async (req, res) => {

    const { username, purpose, branch } = req.body;

    const userRegex = /^[0-9]{10}$/;

    if (!userRegex.test(username)) {
        return { message: 'Invalid username' };
    }

    try {

        // get first two characters of username
        let getyear = parseInt(username.slice(0, 2));
        const presentyear = getyear + 2000;

        const currentyear = new Date().getFullYear();


        const year = currentyear - presentyear;

        if(year < 0 || year > 4) {
            return { message: 'Invalid username' };
        }

        const checkLog = await pool.query(
            `
            SELECT * FROM logs
            WHERE username = ? AND logout_time IS NULL`,
            [username]
        );

        if (checkLog[0].length > 0) {
            return { message: 'Already Logged In' };
        }

        const response = await pool.query(
            `
            INSERT INTO logs (username, purpose, branch, year)
            VALUES (?, ?, ?, ?)`,
            [username, purpose, branch, year]
        );

        return { message: 'Logged Successfully' };
        
    } catch (error) {
        return { message: 'Failed' };
    }

}

module.exports = {
    handleLogIn
};