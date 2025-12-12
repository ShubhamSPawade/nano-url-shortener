import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './connect.js';
import urlRouter from './routers/url.js';
import URL from './models/url.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

connectDB(MONGODB_URI);

app.use('/url', urlRouter);

app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date(),
                        userAgent: req.get('User-Agent') || '',
                        referrer: req.get('Referer') || '',
                        ipAddress: req.ip || '',
                    },
                },
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        return res.redirect(entry.redirectUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
