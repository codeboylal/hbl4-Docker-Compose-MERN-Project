const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const movieRouter = require('./routes/movie-router')

const app = express()
const apiPort = process.env.PORT || 5000

// Behind nginx + Cloudflare, so trust the forwarded headers for real client IPs.
app.set('trust proxy', true)

app.use(bodyParser.urlencoded({ extended: true }))

// In production the browser talks to the API through nginx on the SAME origin,
// so CORS never triggers. CORS_ORIGIN is only needed if you ever call the API
// from a different domain; leave it unset to allow any origin.
app.use(cors({ origin: process.env.CORS_ORIGIN || true }))

app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/healthz', (req, res) => {
    res.json({ status: 'ok', db: db.readyState === 1 ? 'up' : 'down' })
})

app.use('/api', movieRouter)

app.listen(apiPort, '0.0.0.0', () =>
    console.log(`Server running on port ${apiPort}`)
)
