var auth = require('./auth');

module.exports = function(app) {
    // app.get('/partials/:partialPath', function(req, res) {
  //   res.render('partials/' + req.params.partialPath);
  // });

  // IMPORTANT: this route must come before app.get('*') routing to avoid circular errors
  app.get('/partials/*', function(req, res) {
    console.log(req.params[0])
    res.render('../../public/app/' + req.params[0]);  // the first index will be what matches with asterisk
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    // logout method added to req obj by passport
    req.logout();
    res.end();
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });


}