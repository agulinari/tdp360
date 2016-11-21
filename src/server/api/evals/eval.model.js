var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EvalSchema = new Schema({
  titulo: String,
  tipo: String,
  comunicacion: [{
  					id: Number,
  					descripcion: String
  				}],
  desempenio: [{
  					id: Number,
  					descripcion: String
  			  }],
  factorhumano: [{
  					id: Number,
  					descripcion: String
  				}],
  habilidades: [{
  					id: Number,
  					descripcion: String
  			}],
  liderazgo: [{
  					id: Number,
  					descripcion: String
  			 }]
});

module.exports = mongoose.model('EvalSchema', EvalSchema);