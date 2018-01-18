const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const GpsController = require('./controllers/gps')

app.use(bodyParser.json());
app.use('/api/gps', GpsController)

app.get('/', (req,res) => {
  res.send('Hello world!')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log("Server is up on port: " + PORT)
})