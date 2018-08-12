var path = require('path');
var rootPath = path.normalize(__dirname + '../../');
var mongopwd = process.env.PASSWORDMONGO;

module.exports = {
  development: {
    db: 'mongodb://localhost:27017/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb+srv://jezzamondev:' + mongopwd +'@cluster0-hkx6v.mongodb.net/multivision?retryWrites=true',
    port: process.env.PORT || 80
  }
}