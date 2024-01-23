const { pool } = require('../../config/db');

// he can only register for one club in one domain 

const checkDomain = async (Domain) => {
    try {
        
    } catch (error) {
        
    }
}



const handleClubReg = async (req, res) => {
    const { userId, clubId, why, resumeLink, preknowledge } = req.body;
    console.log(userId, clubId, why, resumeLink, preknowledge);


    try {
        const response = await pool.query(
            `
            INSERT INTO club_reg (user_id, club_id, why, resume_link, preknowledge)
            VALUES (?, ?, ?, ?, ?)`,
            [userId, clubId, why, resumeLink, preknowledge]
        );
            
        return { message: 'Registered Successfully'}
        
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { message: 'Already Registered to a Club' };
        }
        return { message: 'Failed' };
    }
};

module.exports = {
    handleClubReg
};


