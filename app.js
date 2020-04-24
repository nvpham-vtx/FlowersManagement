var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var routes = require("./router/router");
var path = require('path');

var app = express();
app.set("port", process.env.PORT || 3000);
const buildPath = path.join(__dirname, '/client/build');
app.use(express.static(__dirname + "/client/build"));
app.use(bodyParser.urlencoded({extended: true,}));
app.use(bodyParser.json());
app.use("/", routes);
app.use('*', express.static(buildPath));ohohoh

var server = http.createServer(app);
server.listen(app.get("port"), () =>{
    console.log("Listen port " + app.get("port"));
})

