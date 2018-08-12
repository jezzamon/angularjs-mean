var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongopwd = process.env.PASSWORDMONGO;

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


if (env === 'development') {
  // mongoose connection
mongoose.connect('mongodb://localhost:27017/multivision', { useNewUrlParser: true });
} else  if (env === 'production') {
// mongoose connection
mongoose.connect('mongodb+srv://jezzamondev:' + mongopwd +'@cluster0-hkx6v.mongodb.net/multivision?retryWrites=true', { useNewUrlParser: true });
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log('your db is connected');
});

// app.get('/partials/:partialPath', function(req, res) {
//   res.render('partials/' + req.params.partialPath);
// });

app.get('/partials/*', function(req, res) {
  console.log(req.params[0])
  res.render('../../public/app/' + req.params[0]);  // the first index will be what matches with asterisk
});

app.get('*', function(req, res) {
  res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('listening on port ' + port + '...')