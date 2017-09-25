const http= require('http');
const express = require('express');
const app= express();
const controllers = require("./controllers");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectFlash = require('connect-flash');


//Setting up the view engine
app.set("view engine", "vash");

//Opt into services
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//By default node and express do not use session state so we might have to configure it
app.use(cookieParser());
app.use(session({ secret: "MyBoardProject" }));
app.use(connectFlash()); //Flash uses session state. Not very nice :O

//Setting the controller that will handle the routes of the project
//Map the routes
controllers.init(app);

//Handler to tell the server that this folder could be seen by the users
//set the public static resource folder
app.use(express.static(__dirname + "/public"));

//Server
const server= http.createServer(app);
server.listen(3000, '127.0.0.1');
