var express = require('express');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var app = express();

// invoke function/module express.js passing env to take correct obj key
var config = require('./server/config/config')[env];

// invoke your custom module express.js passing in arguments
require('./server/config/express') (app, config);



// mongoose connection
mongoose.connect(config.db, { useNewUrlParser: true });

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

app.listen(config.port);
console.log('listening on port ' + config.port + '...')