const express = require('express');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({extended:false}));

app.use('/login', express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.send("Hello, my application");
})

app.post('/login', (req,res) =>{
    console.log(req.body);
    //console.log(req.body.email);
    //console.log(req.body.password);
    //do some database process
    res.redirect("/");
});

app.listen(3000, ()=> console.log("server is running at 3000:"));




