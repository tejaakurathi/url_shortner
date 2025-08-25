// analysisservice/routes/analysisRoutes.js
const express = require('express');
const router = express.Router();
const connectDB = require('./dbConnect');
const auth = require('./middleware/authMiddleware');

// GET /urls - Get all URLs for user
router.get('/urls', async (req, res) => {
  const {userID}=req.query;
  console.log(typeof userID, userID);
  console.log('Received userID:', userID);

  try {
    const db = await connectDB();
    const urls = await db.query('SELECT * FROM shorturl WHERE userID = ?', [userID]);
    res.json({ success: true, urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const db = await connectDB();

    // Fetch the original URL
    const result = await db.query(
      'SELECT orgurl FROM shorturl WHERE shortendurl = ?',
      [shortCode]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    const originalUrl = result[0].orgurl;

    //  Increment the click count
    await db.query(
      'UPDATE shorturl SET clicks = clicks + 1 WHERE shortendurl = ?',
      [shortCode]
    );

    // 3. Redirect the user
    return res.redirect(originalUrl);
  } catch (err) {
    console.error('Redirection error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports =router;