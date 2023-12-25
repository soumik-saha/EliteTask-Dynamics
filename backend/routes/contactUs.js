const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        // Validate name, email, message existence
        if (!email || !name || !message) {
            return res.status(400).json({ success: false, message: 'Please fill all required details' });
        }
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.json({ success: true, message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
