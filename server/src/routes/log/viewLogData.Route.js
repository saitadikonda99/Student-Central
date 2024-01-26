const express = require('express');
const router = express.Router();

const { viewLogData } = require('../../controller/log/viewLogData.Controller');

router.get('/:userId', async (req, res) => {

    const userId = req.params.userId;

    const response = await viewLogData(userId);
    res.json(response);
});

module.exports = router;