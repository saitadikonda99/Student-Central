const express = require('express')
const router = express.Router()

const { handleLogout } = require('../../controller/auth/logout.controller')

router.get('/', handleLogout);


module.exports = router;
