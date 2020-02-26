const express = require('express');


const app = express();


// route
app.get('/', (req,res)=>{
    res.send("Hey there Big stack");
});


const port = process.env.PORT  || 3000;

app.listen(port, () => console.log(`app is running at port ${port}`));

