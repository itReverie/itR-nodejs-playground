const http= require('http');
const express = require('express');
const app= express();
const controllers = require("./controllers");

//Setting up the view engine
app.set("view engine", "vash");

//Setting the controller that will handle the routes of the project
//Map the routes
controllers.init(app);

//Server
const server= http.createServer(app);
server.listen(3000, '127.0.0.1');


