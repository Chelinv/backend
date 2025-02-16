const express = require('express');
const {
  agregarAlumno,
  obtenerAlumnos,
  obtenerEstadisticas,
  agregarDatosQuemados
} = require('../controllers/alumnoController');

const router = express.Router();

router.post('/', agregarAlumno); // Agregar alumno
router.get('/', obtenerAlumnos); // Listar alumnos
router.get('/estadisticas', obtenerEstadisticas); // Obtener estadísticas
router.post('/insertar-datos', agregarDatosQuemados); // Insertar datos quemados

module.exports = router;