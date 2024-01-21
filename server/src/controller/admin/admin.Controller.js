const { pool } = require('../../config/db');


const adminHome = async (req, res) => {
    try {
        const response = await pool.query(
            `   
            SELECT 
                users.id AS user_id,
                users.username,
                users.password,
                users.role,
                users.refresh_token,
                users.created_at AS user_created_at,
                user_details.name,
                user_details.gender,
                user_details.branch,
                user_details.year,
                user_details.email,
                user_details.address,
                user_details.residence,
                user_details.phone,
                user_details.profile_pic,
                club_reg.club_id,
                club_reg.why,
                club_reg.resume_link,
                club_reg.preknowledge,
                club_reg.acceptance,
                club_reg.created_at AS club_reg_created_at
            FROM users
            JOIN club_reg ON users.id = club_reg.user_id
            LEFT JOIN user_details ON users.id = user_details.user_id;`
    );
            
    return response.length > 0 ? response[0] : {error: "No data found"};
    
    } catch (error) {
        return { message : 'Something went wrong!' };
    }
}

module.exports = {
    adminHome
};
