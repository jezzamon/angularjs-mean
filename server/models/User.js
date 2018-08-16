var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  salt: String,
  hashed_pwd: String,
  roles: [String]
});

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  }
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0 ) {
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'joe')
  
      User.create({ firstName: 'Jerry', lastName: 'Relunia', 
        username: 'jez', salt: salt, hashed_pwd: hash,
        roles: ['admin']});
      User.create({ firstName: 'Jessica', lastName: 'Gaulin', 
        username: 'jessie', salt: salt, hashed_pwd: hash,
        roles: []});
        User.create({ firstName: 'Clark', lastName: 'Kent', 
        username: 'jessie', salt: salt, hashed_pwd: hash});
    }
  });
}

exports.createDefaultUsers = createDefaultUsers;