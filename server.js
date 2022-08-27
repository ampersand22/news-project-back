//___________________
//Dependencies
//___________________
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const db = mongoose.connection;
require('dotenv').config()
const Articles = require('./models/Articles.js')
const articleSeed = require('./models/articleSeed.js')

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;



// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//// MIDDLEWEAR
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))


Articles.create(articleSeed, (err, data) => {
    console.log('added hero data');
})


// Get
app.get('/news', (req, res)=>{
    Articles.find({}, (err, foundArticles)=>{
        res.json(foundArticles);
    });
});

// Post
app.post('/news', (req, res) => {
    Articles.create(req.body, (err, createdArticles) => {
        res.json(createdArticles);
    })
})

app.get('/news/seed', (req, res)=>{
    Articles.create(articleSeed, (err, foundArticles)=>{
        res.json(foundArticles);
    });
});






/// LISTENING ////

app.listen(PORT, () => {
    console.log('listening on ', PORT, ' homie...');
  })
  
//   mongoose.connect('mongodb://localhost:27017/news')
//   mongoose.connection.once('open', ()=>{
//       console.log('connected to mongod...');
//   });