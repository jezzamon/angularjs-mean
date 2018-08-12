var mongoose = require('mongoose');
module.exports = function (config) {
  // mongoose connection
  mongoose.connect(config.db, {useNewUrlParser: true });

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function callback() {
    console.log('your db is connected');
  });

  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,

  });

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if(collection.length === 0 ) {
      User.create({ firstName: 'Jerry', lastName: 'Relunia', userName: 'jez'}),
      User.create({ firstName: 'Jessica', lastName: 'Gaulin', userName: 'jessie'})
    }
  })
}