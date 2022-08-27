const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')



//// MIDDLEWEAR
app.use(express.json())
app.use(cors())






/// LISTENING ////

app.listen(3000, () => {
    console.log('listening on 3000 homie...');
  })
  
  mongoose.connect('mongodb://localhost:27017/news')
  mongoose.connection.once('open', ()=>{
      console.log('connected to mongod...');
  });