const express = require("express");
const router = express.Router();
const db = require("../config/db");
const indexController = require("../controllers/indexController");

// Middleware para proteger rutas
function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    req.session.error = "Debes iniciar sesión para ver esa página";
    res.redirect("/auth/login");
}

// Página pública

router.get("/", indexController.getIndex);

// Dashboard protegido
router.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard", { userId: req.session.userId });
});

module.exports = router;
