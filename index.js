const express = require('express');
const connectDB = require('./connect');
const urlRouter = require('./routers/url');
const URL = require('./models/url');
const dotenv = require('dotenv');

process.env.DOTENV_CONFIG_QUIET = 'true';
dotenv.config({ silent: true });

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

async function startServer() {
    try {
        await connectDB(MONGODB_URI);
        console.log('Connected to MongoDB');

        app.use('/url', urlRouter);

        app.get('/:shortId', async (req, res) => {
            try {
                const { shortId } = req.params;

                const entry = await URL.findOneAndUpdate(
                    { shortId },
                    {
                        $push: {
                            visitHistory: {
                                timestamp: new Date(),
                                userAgent: req.get('User-Agent') || '',
                                referrer: req.get('Referer') || '',
                                ipAddress: req.ip || ''
                            }
                        }
                    },
                    { new: true }
                );

                if (!entry) {
                    return res.status(404).json({ error: "Short URL not found" });
                }

                return res.redirect(entry.redirectUrl);

            } catch (err) {
                console.error(err);
                res.status(500).send("Server error");
            }
        });

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

startServer();
