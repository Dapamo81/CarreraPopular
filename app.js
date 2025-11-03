require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
if (process.env.NODE_ENV === "production") {
    require("dotenv").config({ path: "/env/.env" });
}
const pool = require("./config/db"); // Importamos pool separado
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para añadir pool a req
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para parsear cuerpos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Sesiones
app.use(
    session({
        secret:
            process.env.SESSION_SECRET ||
            process.env.JWT_SECRET ||
            "secreto_temporal", // <--- obligatorio
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 }, // 1 hora
    })
);

// Middleware para mensajes flash (guardamos en session)
app.use((req, res, next) => {
    res.locals.error = req.session.error || null;
    res.locals.success = req.session.success || null;
    delete req.session.error;
    delete req.session.success;
    next();
});

// Rutas
app.use("/", indexRoutes);
app.use("/", authRoutes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
