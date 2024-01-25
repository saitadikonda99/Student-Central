const express = require('express');
const router = express.Router();

const { handleLogIn } = require('../../controller/log/logIn.Controller');

router.post('/', async (req, res) => {
    const response = await handleLogIn(req, res);
    res.json(response);
});

module.exports = router;