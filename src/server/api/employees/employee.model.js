var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  fullName: String,
  area: String,
  puesto: String,
  interno: Number,
  image: String,
  jefe: String,
  email: String
});

module.exports = mongoose.model('EmployeeSchema', EmployeeSchema);