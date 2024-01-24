const { pool } = require('../../config/db');


const checkDomain = async (userId, domain) => {
    try {
        const response = await pool.query(
            'SELECT COUNT(*) as count FROM club_reg WHERE user_id = ? AND club_domain = ?',
            [userId, domain]
        );

        if (response[0][0].count === 0) {
            return false;
        }   

        return true;

    } catch (error) {
        return true;  
    }
};


const handleClubReg = async (req, res) => {
    const { userId, clubId, why, resumeLink, preknowledge, domain } = req.body;

    if (!userId || !clubId || !why || !resumeLink || !preknowledge || !domain) {
        return { message: 'Please fill all the details' };
    }

    console.log(req.body);

    const client = await pool.getConnection();

    try {
        await client.query('BEGIN');

        const isRegistered = await checkDomain(userId, domain);
        console.log(isRegistered);

        if (isRegistered === true) {
            return { message: `Already Registered to a Club with domain ${domain}`}
        }

        await client.query(
            'INSERT INTO club_reg (user_id, club_id, why, resume_link, preknowledge, club_domain) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, clubId, why, resumeLink, preknowledge, domain]
        );

        await client.query('COMMIT');

        return { message: 'Registered Successfully'}

    } catch (error) {

        await client.query('ROLLBACK');

        if (error.code === 'ER_DUP_ENTRY') {
            return { message: `Already Registered to a Club with domain ${domain}`}
        }

        console.error(error);
        return { message: 'Something went wrong!' };

    } finally {
        client.release();
    }
};

module.exports = {
    handleClubReg
};


