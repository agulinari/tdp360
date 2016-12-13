var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InstanceSchema = new Schema({
  evaluador: String,
  evaluado: String,
  eval: String,
  status: String,
  comunicacion: [{
  					puntaje: Number
  				}],
  desempenio: [{
  					puntaje: Number
  			  }],
  factorhumano: [{
  					puntaje: Number
  				}],
  habilidades: [{
  					puntaje: Number
  			}],
  liderazgo: [{
  					puntaje: Number
  			 }]
});

module.exports = mongoose.model('InstanceSchema', InstanceSchema);