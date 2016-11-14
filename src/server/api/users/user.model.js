var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
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

module.exports = mongoose.model('User', UserSchema);