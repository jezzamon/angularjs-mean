var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName:  { type: String, required: '{PATH} is required!'},
  lastName:   { type: String, required: '{PATH} is required!'},
  username:   { type: String, required: '{PATH} is required!', unique: true },
  salt:       { type: String, required: '{PATH} is required!'},
  hashed_pwd: { type: String, required: '{PATH} is required!'},
  roles:      [String]
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