var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// var env = 'production';


var app = express();

// invoke function/module express.js passing env to take correct obj key
var config = require('./server/config/config')[env];

// invoke your custom modules (express, mongoose) passing in arguments
require('./server/config/express') (app, config);

require('./server/config/mongoose') (config);

var User = mongoose.model('User');

// listener to the passport.authenticate local strategy 
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username}).exec(function(err, user) {
      if (user && user.authenticate(password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }

    })
  }
));


// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser(function(user, done) {
  if(user) {
    done(null, user._id);
  }
})

passport.deserializeUser(function(id, done) {
  
  User.findOne({_id:id}).exec(function(err,user) {
    if(user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
})

// invoke your custom modules (routes) passing in arguments
require('./server/config/routes') (app);

app.listen(config.port);
console.log('listening on port ' + config.port + '...')