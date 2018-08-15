var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// var env = 'production';


var app = express();

// invoke function/module express.js passing env to take correct obj key
var config = require('./server/config/config')[env];

// invoke your custom modules (express, mongoose, routes) passing in arguments
require('./server/config/express') (app, config);

require('./server/config/mongoose') (config);

require('./server/config/passport') ();

// invoke your custom modules (routes) passing in arguments
require('./server/config/routes') (app);

app.listen(config.port);
console.log('listening on port ' + config.port + '...')