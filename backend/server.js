// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://admin:bsLLjnKZoAg2j1UY@cluster1.dfx1hte.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
const contactUsRoute = require('./routes/contactUs');
const newsletterRoute = require('./routes/newsletter');
const userRoute = require('./routes/user');

app.use('/api/contact-us', contactUsRoute);
app.use('/api/newsletter', newsletterRoute);
app.use('/api/user', userRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
