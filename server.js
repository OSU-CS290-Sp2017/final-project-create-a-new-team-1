var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
var entryData = require('entryData');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/', function(req, res, next){
	var entry = entryData;
	if(entry){
		var templateArgs = {
			entries: entry,
			show: true
		}
		res.render('entryPage', templateArgs);
	}
	else{
		next();
	}
});

app.get('*', function(req, res){
  res.status(404).render('404');
});
app.listen(port, function){
  console.log("Server is running!");
}
