const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const path = require("path");
require('dotenv').config({path: './config/.env'})
require('./config/db')

const usersRoutes = require("./routes/users.routes")
const gamesRoutes = require("./routes/games.routes")
const editorsRoutes = require("./routes/editor.routes")
const festivalsRoutes = require("./routes/festivals.routes")
const exhibitorsRoutes = require("./routes/exhibitors.routes")
const zonesRoutes = require("./routes/zones.routes")

const {checkUser, requireAuth} = require("./middleware/auth.middleware")

const app = express()

//jwt
/*
app.get("*", checkUser)
app.get("/jwtid", requireAuth, (req,res) => {
    res.status(200).send(res.locals.user._id)
})*/

//middleware
app.use(cookieParser()) //cookie
app.use(cors())
app.use(express.json()) //body
app.use(express.urlencoded({extended: true})) //url

// Serve front
app.use(express.static(path.join(__dirname, 'front/build')));

//routes
app.use("/api/users", usersRoutes)
app.use("/api/games", gamesRoutes)
app.use("/api/editors", editorsRoutes)
app.use("/api/festivals", festivalsRoutes)
app.use('/api/exhibitors', exhibitorsRoutes)
app.use('/api/zones', zonesRoutes)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
