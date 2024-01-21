const express = require('express')
const router = express.Router()

const { viewProfile } = require('../../controller/profile/profile.Controller')

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const response = await viewProfile(userId)
    res.send(response)
});

module.exports = router;