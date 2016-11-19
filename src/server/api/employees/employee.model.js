var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  fullName: String,
  address: String,
  city: String,
  country: String,
  zipCode: String,
  image: String,
  email: String
});

module.exports = mongoose.model('EmployeeSchema', EmployeeSchema);