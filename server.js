const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importar rutas
const alumnoRoutes = require('./routes/alumnoRoutes');
app.use('/api/alumnos', alumnoRoutes);

// Ruta por defecto
app.get('/', (req, res) => {
  res.send('🚀 API de calificaciones en funcionamiento');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
