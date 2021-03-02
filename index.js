const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")

const path = require("path");
const app = express()
const port = process.env.PORT|| 8090

const testRoutes = require('./routes/test.routes')
const gamesRoutes = require("./routes/games.routes")

require('dotenv').config({path: './config/.env'})
require('./config/db')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//routes
app.use('/api/test', testRoutes)
app.use("/api/games", gamesRoutes)

// Serve front
app.use(express.static(path.join(__dirname, 'front/build')));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})