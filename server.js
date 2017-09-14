const http= require('http');
const express = require('express');
const app= express();

const server= http.createServer(app);

app.get('/', function(request, response){
    response.send('hola');
});


server.listen(3000, '127.0.0.1');