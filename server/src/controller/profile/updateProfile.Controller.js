//updateProfile.Controller.js

const { pool } = require("../../config/db")
// name VARCHAR(255) NOT NULL,
//     gender VARCHAR(255) NOT NULL,
//     branch VARCHAR(255) NOT NULL,
//     year INT NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     address VARCHAR(255) NOT NULL,
//     residence VARCHAR(255) NOT NULL,
//     phone VARCHAR(255) NOT NULL,
//     profile_pic VARCHAR(255) NOT NULL,

const updateProfile = async (userId, body) => {
    const { name, branch, year, email, address, residence, phone, profile_pic } = body;
    try {
        const response = await pool.query(
            `
            UPDATE user_details SET name = ?, branch = ?, year = ?, email = ?, address = ?, residence = ?, phone = ?, profile_pic = ?
            WHERE user_id = ?`,
            [name, branch, year, email, address, residence, phone, profile_pic, userId]
        )
        return response[0].length > 0 ? response[0] : {message: "No user found"}
    } catch (error) {
        return error;
    }
}

module.exports = {
    updateProfile
}