const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.DATABASE;

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connection established');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
};

module.exports = connectDB;
