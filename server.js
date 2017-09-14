const http= require('http');
const express = require('express');
const app= express();

//Setting up an engine
app.set("view engine", "jade");

//jade looks by default for views in the folder views
app.get('/', function(request, response){
    response.render('jade/index', {title: "Express + Jade"});
});

//Server
const server= http.createServer(app);
server.listen(3000, '127.0.0.1');