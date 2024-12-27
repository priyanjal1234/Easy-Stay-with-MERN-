const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const passport = require('passport')
require('./config/passport')
const session = require('express-session')

// Database Connection
const db = require('./config/db')
db()

// Routes
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const roomRouter = require('./routes/roomRouter')
const bookingRouter = require('./routes/bookingRouter')
const paymentRouter = require('./routes/paymentRouter')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: 'https://easy-stay-with-mern-frontend.onrender.com',
    credentials: true
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/users",userRouter)

app.use("/api/admin",adminRouter)

app.use("/api/rooms",roomRouter)

app.use("/api/bookings",bookingRouter)

app.use("/api/payment",paymentRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT,function() {
    console.log(`Server is running on port ${PORT}`)
})
