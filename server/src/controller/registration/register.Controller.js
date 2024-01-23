const { pool } = require('../../config/db');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const sendVerificationMail = async (username, email) => {

try {
    // create a token 
        const verifyToken = jwt.sign(
            { username: username, email: email },
            process.env.VERIFY_TOKEN_SECRET,
            { expiresIn: '1d', algorithm: 'HS256' }
        );

        // send email to user with the forgot token
        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Verify your email',
            text: `Click on the link to verify your email: ${process.env.CLIENT_URL}/${verifyToken}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            }  
        })
        res.status(201).send({
            Email_status: 'Email sent'
        })

    } catch (error) {
        res.status(400).send({
            Email_status: 'Email does not exist'
        })
    }
}




const handleRegister = async (req, res) => {

    console.log(req);
    const userValid = /^23000\d{5}$/;
    const phoneValid = /^[789]\d{9}$/;
    const verifyEmail = username + '@kluniversity.in';
    const isVerified = 0;

    const {
        username,
        password,
        name,
        branch,
        year,
        gender,
        email,
        residence,
        address,
        phone,
        profile_pic
    } = req;

    if (!username || !password || !name || !branch || !year || !address || !phone || !profile_pic || !gender || !email || !residence ) {
        return { message : 'Please fill all the details' };
    }

    if (!userValid.test(username)) {
        return { message : 'Invalid Username' };
    }
     
    if(!phoneValid.test(phone)) {
        return { message : 'Invalid Phone Number' };
    }
    
    
    try {
    
    const response = await pool.query(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, password]
    );
        
    const userId = response[0].insertId;
     

    const response2 = await pool.query(
        `INSERT INTO user_details (user_id, name, branch, year, address, phone, profile_pic, gender, email, residence, verified)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, name, branch, year, address, phone, profile_pic, gender, email, residence, isVerified]
    );
    
    response && response2 ? sendVerificationMail(username, verifyEmail) : null;
    
    return response && response2  ? { message : `You're Successfully Registered` } : { message : 'Failed to Register' };
    
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

        console.log(error);


        return { message : 'Failed' };
    }
}

module.exports = {
    handleRegister
}