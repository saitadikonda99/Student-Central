const express = require('express'); 
const router = express.Router();

const { getLogData } = require('../../controller/log/getLogData.Controller')


router.get('/', async (req, res) => {
    const response = await getLogData(req, res);
    res.send(response);
});

module.exports = router;
