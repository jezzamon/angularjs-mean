var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongopwd = process.env.PASSWORD;

var app = express();

function compile(str, path) {
  return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));

// any requests that much files in public directory , return the file
app.use(express.static(__dirname + '/public'));  

// mongoose connection
mongoose.connect('mongodb://jezzamondev:' + mongopwd + '@cluster0-shard-00-00-hkx6v.mongodb.net:27017,cluster0-shard-00-01-hkx6v.mongodb.net:27017,cluster0-shard-00-02-hkx6v.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log('your db is opened');
});



app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
  res.render('index');
});

var port = 3030;
app.listen(port);
console.log('listening on port ' + port + '...')