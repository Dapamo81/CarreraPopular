require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const pool = require('./config/db'); // Importamos pool separado
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para añadir pool a req
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear cuerpos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Middleware para mensajes flash (guardamos en session)
app.use((req, res, next) => {
  res.locals.error = req.session.error || null;
  res.locals.success = req.session.success || null;
  delete req.session.error;
  delete req.session.success;
  next();
});

// Rutas
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});