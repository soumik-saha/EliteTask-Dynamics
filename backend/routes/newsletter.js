const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        // Validate email existence
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        const existingEmail = await Newsletter.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email already subscribed' });
        }
        const newSubscription = new Newsletter({ email });
        await newSubscription.save();
        res.json({ success: true, message: 'Newsletter subscription successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
