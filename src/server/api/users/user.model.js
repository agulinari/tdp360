var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  idemployee: {
    type: String,
    required: true,
    unique: true
  },
  username: {
  	type: String,
  	required: true,
  	unique: true
  },
  password: {
  	type: String,
  	required: true
  }
});

var User =  mongoose.model('User', UserSchema);
var admin = { 'username' : 'admin',  'password' : 'admin', 'idemployee' : '0' };
User.create(admin, function(error, doc) {
  // default admin
  console.log(doc);
});

module.exports = User;