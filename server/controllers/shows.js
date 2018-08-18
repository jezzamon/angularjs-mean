var Show = require('mongoose').model('Show');

exports.getShows = function(req, res) {
  Show.find({}).exec(function(err, collection) {
    res.send(collection);
  })
}

exports.getShowById = function(req, res) {
  Show.findOne({_id: req.params.id})
    .exec(function(err, course) {
      res.send(course);
    })
}