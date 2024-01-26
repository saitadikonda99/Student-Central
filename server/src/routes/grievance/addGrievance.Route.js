const express = require('express');
const router = express.Router();

const { handleAddGrievance } = require('../../controller/grievance/addGrievance.Controller');

router.post('/', async (req, res) => {
    const response = await handleAddGrievance(req, res);
    res.json(response);
}
);

module.exports = router;
