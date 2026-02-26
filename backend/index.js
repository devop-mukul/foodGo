require("dotenv").config();

const express = require('express')
const app = express()
const port = 5000 //backend port

const mongoDB = require('./db')
mongoDB() //connect to mongoDB

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specific headers
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // ← respond to preflight and stop
    }
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json()) //middleware to parse JSON bodies
app.use('/api', require('./routes/CreateUser')) //create user route
app.use('/api', require('./routes/DisplayData')) //display food_items route

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})