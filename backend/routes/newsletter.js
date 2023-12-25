const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const newSubscription = new Newsletter({ email });
        await newSubscription.save();
        res.json({ success: true, message: 'Newsletter subscription successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
