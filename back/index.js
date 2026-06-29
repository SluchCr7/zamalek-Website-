const express = require('express')
const cors = require('cors')
const app = express()
const ConnectDb = require('./Config/db')
const { errorhandler } = require('./Middelwares/errorHandler')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser');

// DB Connection

ConnectDb()

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.DOMAIN_NAME,
    credentials: true    
}));
app.use(express.json()) 
app.use(cookieParser());
// XSS Attack Middelware

// app.use(xss())

// app.use(rateLimit({
//     windowMs: 10 * 60 * 1000, // 10 minutes
//     max: 200, // Limit each IP to 10 requests per `window` (here, per 10 minutes)
//     message: "Too many requests, please try again later.",
// }))

app.use(helmet())


// Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use('/api/auth', require("./routes/UserRoute"))
app.use('/api/news', require("./routes/NewsRoute"))
app.use('/api/photo', require("./routes/PhotoRoute"))
app.use('/api/players', require('./routes/PlayersRoute'))
app.use('/api/fixtures', require('./routes/FixturesRoute'))
app.use('/api/standings', require('./routes/StandingsRoute'))
app.use(errorhandler)

// Listen

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))