const express = require('express');
const app = express();
//const url = require('url');
//const fs = require('fs');


app.use(express.static(__dirname + '/public')).get('/');


app.listen(9000, function(){
    console.log("Game is ready to start on port 9000");    
});