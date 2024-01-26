const { pool } = require("../../config/db");
const cron = require("node-cron");


const handleLogOut = async (req, res) => {

    const { username } = req.body;

    console.log("sasdfgh",username)

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

// Schedule automatic logout every day at midnight
cron.schedule("0 0 * * *", async () => {
    try {
        const response = await pool.query(
            `UPDATE logs SET logout_time = NOW() WHERE logout_time IS NULL`
        );
        console.log('Automatic logout for users at midnight:', response);
    } catch (error) {
        console.log('Error during automatic logout:', error);
    }
});


module.exports = {
    handleLogOut
};