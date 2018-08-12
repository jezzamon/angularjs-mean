var passport = require('passport');

module.exports = function(app) {
    // app.get('/partials/:partialPath', function(req, res) {
  //   res.render('partials/' + req.params.partialPath);
  // });

  // IMPORTANT: this route must come before app.get('*') routing to avoid circular errors
  app.get('/partials/*', function(req, res) {
    console.log(req.params[0])
    res.render('../../public/app/' + req.params[0]);  // the first index will be what matches with asterisk
  });

  app.post('/login', function(req, res, next) {
    
    // set up authenticate function
    var auth = passport.authenticate('local', function(err, usuer) {
      if(err) { return next(err);}
      if(!user) { res.send({success: false})}

      //login function added by passport to req obj
      req.logIn(user, function(err) {
        if(err) { return next(err);}
        
        res.send(send(
          { success: true, user:user }
        ));
      });
    });

    auth(req, res, next);
  });

  app.get('*', function(req, res) {
    res.render('index');
  });


}

// note: Typically with passport we log in with server side route (submitted form)
// but here we are logging in using XHR post, normally you dont have to tell
// passport to login the user itself but since we are using XHR we need  req.logIn 