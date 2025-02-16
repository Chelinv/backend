const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  nombre: String,
  cal1: Number,
  cal2: Number,
  cal3: Number,
  calFinal: Number,
  observacion: String
});

const Alumno = mongoose.model('Alumno', alumnoSchema);
module.exports = Alumno;