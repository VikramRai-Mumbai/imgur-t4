const express = require('express');

//init express
const app = express();

// create your endpoints/route handlers
app.get('/',function(req,res){
    res.send('Hello World');
});

// linsten on a port
app.listen(3000);