var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  app.get('/api/users', auth.requiresRole('admin'), function(req,res) {
    User.find({}).exec(function(err, collection) {
      res.send(collection);
    })
  });

  // app.get('/partials/:partialPath', function(req, res) {
  //   res.render('partials/' + req.params.partialPath);
  // });

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

   // IMPORTANT: this route must come last  - app.get('*') routing to avoid circular errors
  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });


}