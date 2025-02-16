const express = require('express');
const { agregarAlumno, obtenerAlumnos, obtenerEstadisticas } = require('../controllers/alumnoController');

const router = express.Router();

router.post('/', agregarAlumno);
router.get('/', obtenerAlumnos);
router.get('/estadisticas', obtenerEstadisticas);

module.exports = router;