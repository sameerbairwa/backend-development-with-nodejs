const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// set for ejs
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.send('multer is going fine with nodemon...');
})
app.get("/", (req,res) => {
    res.render('index');
})
app.listen(port, () => console.log(`server is running at: ${port}...`));