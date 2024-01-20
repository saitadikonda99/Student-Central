const express = require('express')
const router = express.Router()

const { viewUserReg } = require('../../controller/registration/viewUserReg.Controller')

router.get('/', async (req, res) => {   
    const response = await viewUserReg(req, res)
    res.send(response)
});

module.exports = router;