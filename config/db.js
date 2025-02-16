const mongoose = require('mongoose');
require('dotenv').config();
const Alumno = require('../models/alumnoModel');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Conectado a MongoDB");

    // Agregar datos quemados solo si la colección está vacía
    const count = await Alumno.countDocuments();
    if (count === 0) {
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
      console.log("✅ Datos quemados insertados correctamente.");
    }
  } catch (error) {
    console.error("❌ Error en la conexión a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;