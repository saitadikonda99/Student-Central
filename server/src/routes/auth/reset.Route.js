const express = require('express')
const { resetPassword } = require('../../controller/auth/reset.Controller')

const router = express.Router()

router.post('/:resetToken', async (req, res) => {
    const resetToken = req.params.resetToken;
    const password = req.body.password;
    console.log("resetToken", resetToken)
    await resetPassword(resetToken, password)
})

module.exports = router;