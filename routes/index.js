const express = require('express');
const router = express.Router();

// Middleware para proteger rutas
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  req.session.error = 'Debes iniciar sesión para ver esa página';
  res.redirect('/auth/login');
}

// Página pública
router.get('/', (req, res) => {
  res.render('index');
});

// Dashboard protegido
router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard', { userId: req.session.userId });
});

module.exports = router;