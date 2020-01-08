const express = require('express');
const app = express();

myconsolelog = function(req,res,next){
    console.log('I am a MIDDLEWARE');
    next();
};

var servertime = function(req,res,next){
    req.requestTime = Date.now()
    next()
}
app.use(servertime);

app.use(myconsolelog);

app.get('/', (req,res) =>{
    res.send("Hello World" + "and time is:" + req.requestTime);
    console.log("Hello World From/");
})

app.get('/about-us', (req, res)=>{
   // res.status(200).json({user:"syham", balance:"2000",id:"123ght45"})
    res.status(500).json({user:"syham", balance:"2000",id:"123ght45"})

});
app.get('/ab*cd', (req, res)=>{
    res.send('I am regex page');
});

app.listen(3000, ()=> console.log('server is running at port 3000....'));
