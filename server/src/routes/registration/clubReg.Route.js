const express = require('express')
const router = express.Router()

const { handleClubReg } = require('../../controller/registration/clubReg.Controller')

router.post('/', async (req, res) => {
    const response = await handleClubReg(req, res)
    res.send(response)
});

module.exports = router;