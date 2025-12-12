const { nanoid } = require('nanoid');

const URL = require('../models/url');

async function handleShortenUrl(req, res) {
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const shortId = nanoid(7);
    await URL.create({ shortId, redirectUrl: body.url, visitHistory: [], });

    res.status(201).json({ id: shortId });
}

async function handleAnalystics(req, res) {
    const { shortId } = req.params;
    const entry = await URL.findOne({ shortId });
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.json({ totalClicks: entry.visitHistory.length, analytics: entry.visitHistory });
}

module.exports = { handleShortenUrl, handleAnalystics };