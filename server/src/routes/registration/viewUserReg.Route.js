const express = require('express')
const router = express.Router()

const { viewUserReg } = require('../../controller/registration/viewUserReg.Controller')

router.get('/:userId', async (req, res) => {   
    const { userId } = req.params;
    const response = await viewUserReg(userId)
    res.send(response)
});

module.exports = router;