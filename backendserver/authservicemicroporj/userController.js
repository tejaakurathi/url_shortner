const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./dbConnect'); 

const router = express.Router();
const JWT_SECRET = 'lOLsExR2din6ALclwvIZLKjdth8wCBQMnZVInbmJcVRPQ17SFDZj6o4qQucI5AGGfEK96jN3OGNyyqOLsLBV+zWCq/rrN/hsMvxd9yN99akPRp1hBuh0ecJlkrM830EiGuM9bHgAZe8pjbqPXZpxo2F/2vsgUT9lD0OwJPU+1HFdXfCfndFbFnMNKe1UE88nmCvmk1tbu1YPdyaFy/YawF99AuzIFBxm5XSOVJ/CgnhGoB90Q2D4y/KhJr1fA267GBwjydtgWz3Z4N2Y3qAycGEwx8QEgQBJ4XpVpDU384Z+jGLA3LPkVYdg0vVzfEJbO7hjqdO53Jz8YySqWSgpow==';

// === LOGIN ROUTE ===
router.get('/user', async (req, res) => {
    const { name, password } = req.query;

    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password required' });
    }

    try {
        const db = await connectDB();
        const result = await db.query('SELECT * FROM users WHERE name = ?', [name]);

        if (result.length === 0) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        const user = result[0];
        let validPassword = false;

        if (user.password.startsWith('$2')) {
            // Hashed password
            validPassword = await bcrypt.compare(password, user.password);
        } else {
            // Plaintext password, migrate to hash
            if (password === user.password) {
                validPassword = true;
                const hashedPassword = await bcrypt.hash(password, 10);
                await db.query('UPDATE users SET password = ? WHERE userID = ?', [hashedPassword, user.userID]);
                console.log(`Password updated to hashed version for user: ${name}`);
            }
        }

        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userID: user.userID},
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send token and info to frontend
        res.json({
            success: true,
            message: 'Login successful',
            token,
            userID: user.userID,
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// === REGISTER ROUTE ===
router.post('/user', async (req, res) => {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const db = await connectDB();

        // Check for existing user
        const existing = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, address]
        );

        res.json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
