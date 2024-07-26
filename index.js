const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config()
const bodyParser = require('body-parser');
const notesRoute = require('./routes/notesRoute')
const userRoute = require('./routes/userRoutes')

const app = express()
app.use(bodyParser.json())
const corseOption = {
    origin: ['http://localhost:5173'],
    method: ["POST","PUT","GET"],
    optionsSuccessStatus: 200
}
app.use(cors(corseOption))
// app.use(cors())
dotenv.config()
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })


  const PORT = process.env.PORT || 7000;
  const URL = process.env.MONGO_URL;
  
  
  mongoose.connect(URL).then(() => {
      console.log('DB connected successfully');
  
      app.listen(PORT, () => {
          console.log(`server is running on port:${PORT}`);
      })
  
  }).catch((err) => console.log(err))

  app.get('/', (req,res) => {
    res.send('hello')
  })
  app.use('/api/notes', notesRoute)
  app.use('/api/user', userRoute)
  
