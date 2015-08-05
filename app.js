var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

require('./lib/secrets');

app.locals.title = 'DevSpace';

var routes = require('./routes/index');
var about = require('./routes/about');
var contact = require('./routes/contact');


//=======routes======
app.use('/', routes);
app.use('/about', about);
app.use('/contact', contact);

app.use(function(req, res){
  //400s before 500s
  res.status(403).send('Unauthorized');
});

app.use(function(err, req, res, next){
//4 arguments creates an error handling middleware
  res.status(500).send('my bad');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
