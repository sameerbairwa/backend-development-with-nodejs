const express = require('express');
const app = express();


app.get('/about-us', (req, res)=>{
   // res.status(200).json({user:"syham", balance:"2000",id:"123ght45"})
    res.status(500).json({user:"syham", balance:"2000",id:"123ght45"})

});
app.get('/ab*cd', (req, res)=>{
    res.send('I am regex page');

});

app.get('/user/:id/status/:status_id', (req, res)=>{
    res.send(req.params);

});
app.get('/flights/:from-:to', (req, res)=>{
    res.send(req.params);

});

app.post('/login', (req, res)=>{
    res.send('login successful');

});

app.delete("/delete",(req,res)=>{
    res.send("delete success");
})
app.listen(3000, ()=> console.log('server is running at port 3000....'));
