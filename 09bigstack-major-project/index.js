const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport  = require('passport');

// bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/questions");

const app = express();

// Middleware for bodyparser 
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyparser.json());

// Middleware for passport
app.use(passport.initialize());

//config for jwt
require('./strategies/jsonwtStrategy')(passport);

//mongoDB configuration
const mongodbURL = require("./setup/myurl").mongoURL;

// Attempt to connect to database 
mongoose.connect(mongodbURL, {
        useNewUrlParser: true,  
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Mongodb is connected");
    })
    .catch((err) => {
        console.log("mondb not connected");
        console.log(err);
    });


// just for testing route
// app.get('/', (req,res)=>{
//     res.send("Hey there Big stack");
// });

// actual route
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/questions', questions);



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app is running at port ${port}`));