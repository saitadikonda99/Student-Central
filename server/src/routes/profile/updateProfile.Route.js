// updateProfile.Route.js
const express = require('express')
const router = express.Router()

const { updateProfile } = require('../../controller/profile/updateProfile.Controller')

router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const response = await updateProfile(userId, req.body)
    console.log(response)
    res.send(response)
}
);

module.exports = router;