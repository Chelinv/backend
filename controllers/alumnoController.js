const Alumno = require('../models/alumnoModel');

// Agregar un nuevo alumno
const agregarAlumno = async (req, res) => {
  const { nombre, cal1, cal2, cal3 } = req.body;
  const calFinal = (cal1 * 0.2) + (cal2 * 0.3) + (cal3 * 0.5);
  const observacion = calFinal >= 60 ? 'Aprobado' : 'Reprobado';

  try {
    const nuevoAlumno = new Alumno({ nombre, cal1, cal2, cal3, calFinal, observacion });
    await nuevoAlumno.save();
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(500).json({ message: '❌ Error al guardar el alumno' });
  }
};

// Obtener todos los alumnos
const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ message: '❌ Error al obtener alumnos' });
  }
};

// Obtener estadísticas
const obtenerEstadisticas = async (req, res) => {
  try {
    const totalAprobados = await Alumno.countDocuments({ observacion: 'Aprobado' });
    const totalReprobados = await Alumno.countDocuments({ observacion: 'Reprobado' });
    res.json({ totalAprobados, totalReprobados });
  } catch (error) {
    res.status(500).json({ message: '❌ Error al obtener estadísticas' });
  }
};

module.exports = { agregarAlumno, obtenerAlumnos, obtenerEstadisticas };