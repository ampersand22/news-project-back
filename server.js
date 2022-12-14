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
const Users = require('./models/Users.js')
const bcrypt = require('bcrypt');
const userController = require('./controllers/users_controller.js')


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

// make sure that other middlewear runs first
app.use('/', userController)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Post/Create
app.post('/news', (req, res) => {
    Articles.create(req.body, (err, createdArticles) => {
        res.json(createdArticles);
    })
})

// Get/Index
app.get('/news', (req, res)=>{
//     request(
//         { url: 'https://news-project-back.herokuapp.com/news'},
//         Articles.find({}, (error, response, foundArticles) => {
//             if (error || response.statusCode !== 200) {
//                 return res.status(500).json({ type: 'error', message: err.message })
//             }
//             res.json(JSON.parse(foundArticles))
//             }
//         )
//     )
// })
    Articles.find({}, (err, foundArticles)=>{
        res.json(foundArticles);
    });
});

//Delete
app.delete("/news/:id", (req, res) => {
    Articles.findByIdAndRemove(req.params.id, (err, data) => {
        res.json(data);
    });
});

// Edit/Update Route
app.put("/news/:id",(req, res) => {
    Articles.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, data) => {
            res.json(data);
        })
})


// // USER POST
// // Users create
app.post('/register', (req, res) => {
    Users.create(req.body, (err, createdUsers) => {
        res.json(createdUsers);
    })
})


/// LISTENING ////

app.listen(PORT, () => {
    console.log('listening on ', PORT, ' homie...');
  })
  
//   mongoose.connect('mongodb://localhost:27017/news')
//   mongoose.connection.once('open', ()=>{
//       console.log('connected to mongod...');
//   });