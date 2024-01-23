const { pool } = require('../../config/db');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const sendVerificationMail = async (username, email) => {

try {
    // create a token 
        const verifyToken = jwt.sign(
            { username: username },
            process.env.VERIFY_TOKEN_SECRET,
            { expiresIn: '1d', algorithm: 'HS256' }
        );

        nodemailer.createTransport('smtps://user%myDomain.com:pass@smtp.gmail.com');

         

        // send email to user with the token
        const transporter = nodemailer.createTransport({
            // outlook
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Verify your email | SAC',
            text: `
            hey ${username}, this is team ZeroOne please kindly Click on the link to verify your email: ${process.env.CLIENT_URL}/verify/${verifyToken}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error, info)
            }  
        })
        
        console.log('Verification mail sent');
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}




const handleRegister = async (req, res) => {

    console.log(req);
    const userValid = /^23000\d{5}$/;
    const phoneValid = /^[789]\d{9}$/;
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

    // const verifyEmail = username + '@kluniversity.in';

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
        `INSERT INTO users (username, password, is_verified) VALUES (?, ?, ?)`,
        [username, password, isVerified]
    );
        
    const userId = response[0].insertId;
     

    const response2 = await pool.query(
        `INSERT INTO user_details (user_id, name, branch, year, address, phone, profile_pic, gender, email, residence)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, name, branch, year, address, phone, profile_pic, gender, email, residence]
    );
    
    // response && response2 ? sendVerificationMail(username, verifyEmail) : null;
    
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