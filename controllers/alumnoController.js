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

// Agregar datos quemados (solo si la colección está vacía)
const agregarDatosQuemados = async (req, res) => {
  try {
    const count = await Alumno.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: "❌ Los datos ya han sido insertados." });
    }

    const alumnosIniciales = [
      { nombre: 'Juan Pérez', cal1: 80, cal2: 70, cal3: 90 },
      { nombre: 'Ana Gómez', cal1: 40, cal2: 50, cal3: 45 },
      { nombre: 'Carlos López', cal1: 90, cal2: 85, cal3: 80 }
    ];

    for (const alumno of alumnosIniciales) {
      const calFinal = (alumno.cal1 * 0.2) + (alumno.cal2 * 0.3) + (alumno.cal3 * 0.5);
      const observacion = calFinal >= 60 ? 'Aprobado' : 'Reprobado';

      await new Alumno({ ...alumno, calFinal, observacion }).save();
    }

    res.status(201).json({ message: "✅ Datos quemados agregados correctamente." });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al agregar datos quemados" });
  }
};

module.exports = { agregarAlumno, obtenerAlumnos, obtenerEstadisticas, agregarDatosQuemados };