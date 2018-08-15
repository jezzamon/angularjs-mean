var passport = require('passport');

module.exports.authenticate = function(req, res, next) {
    
  // set up authenticate function
  var auth = passport.authenticate('local', function(err, user) {
    
    if(err) { return next(err);}
    if(!user) { res.send({success: false})}

    //login function added by passport to req obj
    // note: Typically with passport we log in with server side route (submitted form)
    // but here we are logging in using XHR post, normally you dont have to tell
    // passport to login the user itself but since we are using XHR we need  req.logIn 

    req.logIn(user, function(err) {
      if(err) { return next(err);}
      
      res.send(
        { success: true, user:user }
      );
    });
  });
  auth(req, res, next);
}

exports.requiresApiLogin = function(req, res, next) {
  // isAuthenticated is a method passed in by passport to req object
  if(!req.isAuthenticated()) {
    res.status(403) // 403 - forbidden
    res.end();
  } else {
    next();
  }
}

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}

