const http= require('http');
const express = require('express');
const app= express();
const controllers = require("./controllers");
const bodyParser = require('body-parser');
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

//Handler to tell the server that this folder could be seen by the users
//set the public static resource folder
app.use(express.static(__dirname + "/public"));

//Setting up the view engine
app.set("view engine", "vash");

//Opt into services
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(session({ secret: "MyBoardProject" }));
app.use(flash()); //Flash uses session state. I think not very nice. Not very nice


// use authentication
let auth = require("./auth");
auth.init(app);

//Map the routes
controllers.init(app);


//Server
const server= http.createServer(app);
server.listen(3000, '127.0.0.1');
