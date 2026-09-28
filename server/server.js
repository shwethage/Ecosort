const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use Routes
app.use('/api/items', itemRoutes);

// Connect to MongoDB & Start Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB / Compass!');
        app.listen(PORT, () => {
            console.log(`Server is running live on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
    });

app.get('/', (req, res) => {
    res.json({ message: "EcoSort & Pickup API is running successfully!" });
});