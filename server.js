var path = require('path');
var entryData = require('./entryData');
var bodyParser = require('body-parser');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'fp'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.get('/', function(req, res, next){
	var entry = entryData;
	if(entry){
		var templateArgs = {
			entries: entry,
			show: true
		};
		res.render('entryPage', templateArgs);
	}
	else{
		next();
	}
});

app.post('/', function (req, res, next) {
  var entry = entryData;

  if (entry) { // ?
    if (req && req.name) {

      var entryd = { // ??
        amount: req.body.amount,
        sign: req.body.sign,
        desc: req.body.desc,
		name: req.body.name
      };

      entry = entry || [];

      entry.unshift(entryd); // ??
      fs.writeFile('entryData.json', JSON.stringify(entryData), function (err) {
        if (err) {
          res.status(500).send("Unable to save entry to \"database\".");
        } else {
          res.status(200).send();
        }
      });
    } 
    else {
      var entryd = { // ??
        amount: req.body.amount,
        sign: req.body.sign,
        desc: req.body.desc
      };

	  entry = entry || [];

      entry.unshift(entryd); // ??
      fs.writeFile('entryData.json', JSON.stringify(entryData), function (err) {
        if (err) {
          res.status(500).send("Unable to save entry to \"database\".");
        } else {
          res.status(200).send();
        }
      });
    }

  } else {
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
