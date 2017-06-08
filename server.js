var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
server.set('view engine', 'handlebars');
app.get('/', function(req, res, next){
  next();
}
app.get('*', function(req, res){
  res.status(404).render('404');
});
server.listen(port, function){
  console.log("Server is running!");
}
