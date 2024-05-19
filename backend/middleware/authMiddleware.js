const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {  // Adjusted to split the "Bearer" prefix
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        req.payload = decoded;
        next();
    });
};

module.exports = authMiddleware;
