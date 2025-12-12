# Nano URL Shortener with Analytics

A URL shortener built with Node.js, Express, and MongoDB using NanoID. This project allows you to shorten URLs and track analytics for each link, including visits, user agent, referrer, and IP address.

## Features

- Generate short URLs with NanoID
- Track link analytics: timestamps, user agent, referrer, and IP address
- MongoDB storage for persistent URL data
- RESTful API endpoints
- Error handling and server stability

## Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- NanoID
- dotenv (for environment configuration)

## Installation

Follow these steps to set up the project locally.

### Clone the repository

```bash
git clone https://github.com/ShubhamSPawade/nano-url-shortener.git
cd nano-url-shortener
```

### Install dependencies

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root folder with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

### Run the server

```bash
node index.js
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### 1. Shorten a URL

**POST** `/url`

Generates a short ID for the provided URL.

**Request Body:**

```json
{
  "url": "https://example.com"
}
```

**Response:**

```json
{
  "shortUrl": "http://localhost:3000/abc123",
  "shortId": "abc123"
}
```

### 2. Redirect to Original URL

**GET** `/:shortId`

Automatically redirects to the original URL and logs visit details (timestamp, user agent, referrer, IP address) to the database.

### 3. Get Analytics for a Short URL

**GET** `/url/:shortId/analytics`

Returns the visit history for a specific short URL.

**Response:**

```json
{
  "shortId": "abc123",
  "redirectUrl": "https://example.com",
  "visitHistory": [
    {
      "timestamp": "2025-12-13T03:45:00.000Z",
      "userAgent": "Mozilla/5.0",
      "referrer": "https://google.com",
      "ipAddress": "127.0.0.1"
    }
  ]
}
```

## Folder Structure

```
├── controllers/
│   └── url.js          # Handles URL shortening and analytics logic
├── models/
│   └── url.js          # MongoDB schema for URLs
├── routers/
│   └── url.js          # URL API routes
├── connect.js          # MongoDB connection setup
├── index.js            # Main server entry point
├── package.json
├── .env
└── .gitignore
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License

MIT License © 2025 Shubham Pawade