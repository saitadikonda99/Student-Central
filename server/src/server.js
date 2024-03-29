const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
require('dotenv').config()

const IP_ADDRESS = process.env.IP_ADDRESS;
const app = express()
const PORT = 3001


// imports start here

// middleware
const verifyJWT = require('./middleware/verifyJWT')
const verifyRoles = require('./middleware/verifyRoles')
const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOptions')

// auth routes
const Login = require('./routes/auth/login.Route')
const Refresh = require('./routes/auth/refresh.Route')
const Logout = require('./routes/auth/logout.Route')
const Reset = require('./routes/auth/reset.Route')

// Registration routes
const Register = require('./routes/registration/register.Route')
const ClubReg = require('./routes/registration/clubReg.Route')
const viewUserReg = require('./routes/registration/viewUserReg.Route')
const getClubs = require('./routes/clubs/getClubs.Route')
const viewProfile = require('./routes/profile/profile.Route')
const updateProfile = require('./routes/profile/updateProfile.Route')
const Admin = require('./routes/admin/admin.Route')   
const LogIn = require('./routes/log/logIn.Route')
const LogOut = require('./routes/log/logOut.Route')
const LogData = require('./routes/log/getLogData.Route')
const AddGrievance = require('./routes/grievance/addGrievance.Route')
const ViewLogData = require('./routes/log/viewLogData.Route')


// cors 
app.use(cors(corsOptions))
app.use(credentials)

// cookie 
app.use(cookieParser());

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routes start here
app.use('/login', Login)
app.use('/refresh', Refresh)
app.use('/logout', Logout)
app.use('/reset', Reset)

// auth routes
app.use('/registration', Register)
app.use('/clubReg', ClubReg)
app.use('/viewUserReg', viewUserReg)
app.use('/getClubs', getClubs)
app.use('/viewProfile', viewProfile)
app.use('/updateProfile', updateProfile)
app.use('/admin', Admin)

app.use('/logInSheet', LogIn)
app.use('/logOutSheet', LogOut)
app.use('/logData', LogData)

app.use('/viewLogData', ViewLogData )


app.get('/', (req, res) => {
    res.send(`<h1 style="text-align:center">Server running</h1>`);
})

app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server running on port ${PORT}`)
})
