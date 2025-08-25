const express = require('express');
const router = express.Router();
const connectDB = require('./dbConnect');
const auth = require('./middleware/authMiddleware');

router.post('/shortenurl', async (req, res) => {
    const { orgurl, userID } = req.body;

    if (!orgurl) return res.status(400).json({ message: 'URL is required' });

    try {
        const db = await connectDB();

        // Optional: check for existing short URL for the same orgurl + user
        const existing = await db.query(
            'SELECT shortendurl FROM shorturl WHERE orgurl = ? AND userID = ?',
            [orgurl, userID]
        );
        
        if (existing.count > 0) {
            return res.json({ shortUrl: `http://localhost:3001/${existing.shortendurl}` });
        }

        // Generate a unique short code
        let shortCode;
        let isUnique = false;
        while (!isUnique) {
            shortCode = Math.random().toString(36).substring(2, 8);
            const result = await db.query('SELECT * FROM shorturl WHERE shortendurl = ?', [shortCode]);
            if (result.count === 0) isUnique = true;
        }

        await db.query(
            'INSERT INTO shorturl (userID, orgurl, shortendurl) VALUES (?, ?, ?)',
            [userID, orgurl, shortCode]
        );

        res.json({ shortUrl: `http://localhost:3001/${shortCode}` });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;