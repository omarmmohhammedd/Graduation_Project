const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const cors = require('cors')
const cookie = require('cookie-parser')
const path = require('path')

// env Info config
require('dotenv').config()

// enable cors
// app.use(cors())
app.use(
  cors( {
      origin: [ "http://localhost:3000" ],
      methods: [ "GET", "POST","PUT","DELETE" ],
      credentials: true,
  } )
);

// express URL encodded
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// enable cookies
app.use(cookie())

// static file for img
app.use('/images', express.static(path.join(__dirname, 'images')))

// Routes 

app.use('/user', require('./routes/Users'))
app.use('/products', require('./routes/Products'))
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
})
