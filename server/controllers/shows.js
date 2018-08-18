var Shows = require('mongoose').model('Show');

exports.getShows = function(req, res) {
  Shows.find({}).exec(function(err, collection) {
    res.send(collection);
  })
}