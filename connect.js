
const mongoose = require('mongoose');

async function connectDB(mongoURI) {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

module.exports = connectDB;
