const express = require('express')
const bodyParser = require('body-parser')
const testRoutes = require('./routes/test.routes')
require('dotenv').config({path: './config/.env'})
require('./config/db')
const app = express()
const port = process.env.PORT|| 8090

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
//routes
app.use('/api/test', testRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})