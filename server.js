const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/calificaciones', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const alumnoSchema = new mongoose.Schema({
  nombre: String,
  cal1: Number,
  cal2: Number,
  cal3: Number,
  calFinal: Number,
  observacion: String
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

async function agregarDatosQuemados() {
  const count = await Alumno.countDocuments();
  if (count === 0) {
    const alumnosIniciales = [
      { nombre: 'Juan Pérez', cal1: 80, cal2: 70, cal3: 90 },
      { nombre: 'Ana Gómez', cal1: 40, cal2: 50, cal3: 45 },
      { nombre: 'Carlos López', cal1: 90, cal2: 85, cal3: 80 }
    ];

    alumnosIniciales.forEach(async (alumno) => {
      const calFinal = (alumno.cal1 * 0.2) + (alumno.cal2 * 0.3) + (alumno.cal3 * 0.5);
      const observacion = calFinal >= 60 ? 'Aprobado' : 'Reprobado';
      const nuevoAlumno = new Alumno({
        nombre: alumno.nombre,
        cal1: alumno.cal1,
        cal2: alumno.cal2,
        cal3: alumno.cal3,
        calFinal,
        observacion
      });

      await nuevoAlumno.save();
    });
  }
}


agregarDatosQuemados();


app.post('/alumnos', async (req, res) => {
  const { nombre, cal1, cal2, cal3 } = req.body;
  const calFinal = (cal1 * 0.2) + (cal2 * 0.3) + (cal3 * 0.5);
  const observacion = calFinal >= 60 ? 'Aprobado' : 'Reprobado';

  try {
    const nuevoAlumno = new Alumno({ nombre, cal1, cal2, cal3, calFinal, observacion });
    await nuevoAlumno.save();
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el alumno' });
  }
});


app.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener alumnos' });
  }
});


app.get('/estadisticas', async (req, res) => {
  try {
    const totalAprobados = await Alumno.countDocuments({ observacion: 'Aprobado' });
    const totalReprobados = await Alumno.countDocuments({ observacion: 'Reprobado' });
    res.json({ totalAprobados, totalReprobados });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
