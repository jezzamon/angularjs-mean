var mongoose = require('mongoose');
var crypto = require('crypto');

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
    username: String,
    salt: String,
    hashed_pwd: String
  });

  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if(collection.length === 0 ) {
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'joe')

      User.create({ firstName: 'Jerry', lastName: 'Relunia', 
        username: 'jez', salt: salt, hashed_pwd: hash}),
      User.create({ firstName: 'Jessica', lastName: 'Gaulin', 
        username: 'jessie', salt: salt, hashed_pwd: hash})
    }
  });

  function createSalt() {
    return crypto.randomBytes(128).toString('base64');
  }

  function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
  }
}