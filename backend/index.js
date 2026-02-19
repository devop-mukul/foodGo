const express = require('express')
const app = express()
const port = 5000 //backend port

const mongoDB = require('./db')
mongoDB() //connect to mongoDB

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json()) //middleware to parse JSON bodies
app.use('/api', require('./routes/CreateUser')) //use create user route

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})