const express = require('express')
const router = express.Router()

const { handleClubReg } = require('../../controller/clubs/getClub.Controller')


router.get('/', async (req, res) => {
    const response = await handleClubReg(req, res)
    res.send(response)
});

module.exports = router;