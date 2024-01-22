const express = require('express')
const { handleLogin } = require('../../controller/auth/auth.controller')
const router = express.Router()

router.post('/', (req, res) =>{
    handleLogin(req, res)
})

module.exports = router
