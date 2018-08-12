var mongoose = require('mongoose');
module.exports = function (config) {
  // mongoose connection
  mongoose.connect(config.db, {useNewUrlParser: true });

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function callback() {
    console.log('your db is connected');
  });

}