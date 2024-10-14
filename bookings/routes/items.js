const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.render('booking', { items });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
