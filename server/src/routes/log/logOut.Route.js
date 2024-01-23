const express = require('express');
const router = express.Router();

const { handleLogOut } = require('../../controller/log/logOut.Controller');

router.post('/', async (req, res) => {
    const response = await handleLogOut(req, res);
    res.json(response);
});

module.exports = router;