const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Middleware para proteger rutas
function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    req.session.error = "Debes iniciar sesión para ver esa página";
    res.redirect("/auth/login");
}

// Página pública
router.get("/", (req, res) => {
    db.query("SELECT * FROM corredores", (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error en el servidor");
        }

        // Consulta para obtener el podio
        const podioQuery = `
      SELECT id_corredor, posicion, c.nombre, c.apellidos
      FROM podio
      JOIN corredores c ON id_corredor = c.id
    `;

        // Consulta para contar el número de corredores
        const conteoQuery = "SELECT COUNT(*) AS total FROM corredores";

        // Ejecutar ambas consultas
        db.query(podioQuery, (error, podioResults) => {
            if (error) {
                // console.error(error);
                return res.status(500).send("Error en el servidor");
            }

            db.query(conteoQuery, (error, conteoResults) => {
                if (error) {
                    // console.error(error);
                    return res.status(500).send("Error en el servidor");
                }

                // conteoResults[0].total contiene el número de corredores
                const totalCorredores = conteoResults[0].total;

                // console.log(podioResults);
                // console.log(totalCorredores);
                res.render("index", {
                    corredores: results,
                    podio: podioResults,
                    totalCorredores: totalCorredores,
                    rol: req.session.rol || null,
                });
            });
        });
    });
});

// Dashboard protegido
router.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard", { userId: req.session.userId });
});

module.exports = router;
