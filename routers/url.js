const express = require('express');
const router = express.Router();
const { handleShortenUrl, handleAnalystics } = require('../controllers/url');

router.post('/', handleShortenUrl);
router.get('/:shortId/analytics', handleAnalystics);
module.exports = router;