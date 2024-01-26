
const { pool } = require('../../config/db')


const handleAddGrievance = async (req, res) => {
    let { user_id, title, description, response, status } = req.body;

    try {
        pool.query(
            `INSERT INTO grievances (user_id, title, description, response, status) VALUES (?,?,?,?,?)`,
            [user_id, title, description, response, status],
            (error, results, fields) => {
                if (error) {
                    logger.error(`App - Add Grievance Query error\n: ${JSON.stringify(error)}`);
                    return res.status(500).send(`Error: ${error.message}`);
                }
                return res.status(200).send(`Grievance added successfully`);
            }
        );
    }
    catch (error) {
        logger.error(`App - Add Grievance Query error\n: ${JSON.stringify(error)}`);
        return res.status(500).send(`Error: ${error.message}`);
    }
}

module.exports = {
    handleAddGrievance
}
