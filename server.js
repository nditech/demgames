const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const db = require('./models')
const app = express()
const PORT = process.env.PORT || 3001

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

// Add routes, both API and view
app.use(routes)

// Set up promises with mongoose
mongoose.Promise = global.Promise
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/game4good')

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> Game 4 Good - Debate Server now listening on PORT ${PORT}!`)
)

// ========================= REMOVE THE BELOW CODE IN PRODUCTION
const fs = require('fs')

let data = fs.readFileSync('./test/g4g.json', 'utf8')
// let data = fs.readFileSync('./test/g4g-spanish.json', 'utf8')
data = JSON.parse(data)

// remove all current records
db.Question.deleteMany((err, delOK) => {
    if (err) throw err
    else console.log(delOK)
})

// add records from json file
db.Question.insertMany(data, (err, doc) => {
    if (err) throw err
    else console.log('Questions added!')
})