const { pool } = require("../../config/db");


const handleLogOut = async (req, res) => {

    const { username } = req.body;

    const userRegex = /^[0-9]{10}$/;

    if (!userRegex.test(username)) {
        return { message: 'Invalid username' };
    }

    try {

        const checkLog = await pool.query(
            `            
            SELECT * FROM logs
            WHERE username = ? AND logout_time IS NULL`,
            [username]
        );

        if (checkLog[0].length === 0) {
            return { message: 'No logIn found' };
        }

            const response = await pool.query(
                `
                UPDATE logs
                SET logout_time = NOW()
                WHERE username = ?`,
                [username]
            );

            return { message: 'Logged Out Successfully' };
    
        }
    catch (error) {
        console.log(error);
        return { message: 'Failed' };
    }

}

setInterval(async () => {
    try {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const response = await pool.query(
            `
            UPDATE logs
            SET logout_time = CURRENT_TIMESTAMP
            WHERE logout_time IS NULL`,
            [oneDayAgo]
        );
    } catch (error) {
        console.log('Auto logout task failed:', error);
    }
}, 24 * 60 * 60 * 1000);


module.exports = {
    handleLogOut
};