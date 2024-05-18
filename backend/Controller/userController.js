const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
            // Duplicate email error
            return res.status(400).json({ error: 'User already registered' });
        }
        res.status(400).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.createDemoUser = async () => {
    const demoUser = {
        username: 'demo',
        email: 'demo@example.com',
        password: 'password'
    };

    try {
        const existingUser = await User.findOne({ email: demoUser.email });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(demoUser.password, 10);
            const user = new User({ ...demoUser, password: hashedPassword });
            await user.save();
            console.log('Demo user created successfully');
        } else {
            console.log('Demo user already exists');
        }
    } catch (err) {
        console.error('Error creating demo user:', err.message);
    }
};
