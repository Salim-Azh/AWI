const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")

const path = require("path");
const app = express()
const port = process.env.PORT|| 8090

const gamesRoutes = require("./routes/games.routes")
const editorsRoutes = require("./routes/editor.routes")
const festivalsRoutes = require("./routes/festivals.routes")

require('dotenv').config({path: './config/.env'})
require('./config/db')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//routes
app.use("/api/games", gamesRoutes)
app.use("/api/editors", editorsRoutes)
app.use("/api/festivals", festivalsRoutes)

// Serve front
app.use(express.static(path.join(__dirname, 'front/build')));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
