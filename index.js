const express = require('express')
const bodyParser = require('body-parser')
const testRoutes = require('./routes/test.routes')

const path = require("path");
const app = express()
const port = process.env.PORT|| 8090

require('dotenv').config({path: './config/.env'})
require('./config/db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//routes
app.use('/api/test', testRoutes)

// Serve front
app.use(express.static(path.join(__dirname, 'front/build')));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})