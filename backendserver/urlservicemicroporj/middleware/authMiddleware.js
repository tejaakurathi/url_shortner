const jwt = require('jsonwebtoken');
const JWT_SECRET = 'lOLsExR2din6ALclwvIZLKjdth8wCBQMnZVInbmJcVRPQ17SFDZj6o4qQucI5AGGfEK96jN3OGNyyqOLsLBV'; 

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access token missing' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};