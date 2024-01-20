const express = require('express')
const router = express.Router()
const { handleRegister } = require('../../controller/registration/register.Controller')


router.post('/', async (req, res) => {
    const response = await handleRegister(req, res)
    res.send(response)
});

module.exports = router;