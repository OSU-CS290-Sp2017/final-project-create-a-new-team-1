var path = require('path');
var entryData = require('./entryData');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'fp'}));
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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/help', function (req, res) {
  	res.status(200).render('help');
});
app.get('/about', function (req, res) {
  	res.status(200).render('about');
});
app.get('/contact', function (req, res) {
  	res.status(200).render('contact');
});
app.get('/report', function (req, res) {
  	res.status(200).render('report');
});
app.get('*', function (req, res) {
  	res.status(404).render('404');
});

app.listen(port, function () {
  	console.log("== Server listening on port", port);
});