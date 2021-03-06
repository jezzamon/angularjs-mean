var auth = require('./auth');
var users = require('../controllers/users');
var shows = require('../controllers/shows');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);
  
  app.get('/api/shows', shows.getShows)
  app.get('/api/shows/:id', shows.getShowById)

  
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


  app.all('/api/*', function(req, res) {
    res.sendStatus(404);
  });

   // IMPORTANT: this route must come last  - app.get('*') routing to avoid circular errors
  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });

}