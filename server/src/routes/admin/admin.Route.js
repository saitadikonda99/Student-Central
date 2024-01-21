const express = require('express')
const router = express.Router()


const { adminHome } = require('../../controller/admin/admin.Controller')


router.get('/', async (req, res) => {
    const response = await adminHome(req, res)
    res.send(response)
});

module.exports = router;