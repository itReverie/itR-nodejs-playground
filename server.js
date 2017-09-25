const http= require('http');
const express = require('express');
const app= express();
const controllers = require("./controllers");
const sql = require('mssql')

//Setting up the view engine
app.set("view engine", "vash");

//Setting the controller that will handle the routes of the project
//Map the routes
controllers.init(app);

//Handler for telling the server that this folder could be seen by the users
//set the public static resource folder
app.use(express.static(__dirname + "/public"));

app.get("/api/sql", function (request, response){

});


//Server
const server= http.createServer(app);
server.listen(3000, '127.0.0.1');
