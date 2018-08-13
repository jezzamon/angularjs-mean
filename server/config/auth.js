var passport = require('passport');

module.exports.authenticate = function(req, res, next) {
    
  // set up authenticate function
  var auth = passport.authenticate('local', function(err, user) {
    
    if(err) { return next(err);}
    if(!user) { res.send({success: false})}

    //login function added by passport to req obj
    req.logIn(user, function(err) {
      if(err) { return next(err);}
      
      res.send(
        { success: true, user:user }
      );
    });
  });

  auth(req, res, next);
}

// note: Typically with passport we log in with server side route (submitted form)
// but here we are logging in using XHR post, normally you dont have to tell
// passport to login the user itself but since we are using XHR we need  req.logIn 