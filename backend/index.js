const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 5000

// connect db
const connect_db = require('./config/db')
connect_db()

app.use(cors())
app.use(express.json())

// routers
const router = require('./routes/route')

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
})

app.on('error', err => console.log("❌ Failed to connect with HTTP server"))