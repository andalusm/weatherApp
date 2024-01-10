// Server setup
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const api = require('./server/routes/api')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI||"mongodb://127.0.0.1:27017/weatherDB", {
    useNewUrlParser: true,
}).catch((err) => console.log(err))


app.use('/', api)

const port = 5100
app.listen(process.env.PORT||port, function () {
    console.log(`Running on port ${port}`)
})
