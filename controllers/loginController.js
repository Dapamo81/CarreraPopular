const db = require("../config/db");
const bcrypt = require("bcryptjs");
const infoCarrera = require("../controllers/infoCarrera");

exports.getLogin = async (req, res) => {
    try {
        const [corredoresList, podioResults, totalCorredores] =
            await Promise.all([
                infoCarrera.getCorredores(),
                infoCarrera.getPodio(),
                infoCarrera.getTotalCorredores(),
            ]);

        return res.render("login", {
            rol: req.session.rol || null,
            corredores: corredoresList,
            podio: podioResults,
            totalCorredores: totalCorredores,
        });
    } catch (err) {
        console.error("Error al obtener datos para login:", err);
        return res.render("login", {
            rol: req.session.rol || null,
            corredores: [],
            podio: [],
            totalCorredores: 0,
            loginError: "Error en el servidor",
        });
    }
};

exports.postLogin = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    try {
        const [corredoresList, podioResults, totalCorredores] =
            await Promise.all([
                infoCarrera.getCorredores(),
                infoCarrera.getPodio(),
                infoCarrera.getTotalCorredores(),
            ]);

        if (!email || !pass) {
            return res.render("login", {
                rol: req.session.rol || null,
                corredores: corredoresList,
                podio: podioResults,
                totalCorredores: totalCorredores,
                loginError: "Introduzca su usuario y contraseña",
            });
        }

        db.query(
            "SELECT * FROM corredores WHERE email = ?",
            [email],
            async (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send("Error en el servidor");
                }

                if (
                    !results ||
                    results.length === 0 ||
                    !(await bcrypt.compare(pass, results[0].contrasena))
                ) {
                    return res.render("login", {
                        rol: req.session.rol || null,
                        loginError: "Usuario y/o contraseña incorrectas",
                        corredores: corredoresList,
                        podio: podioResults,
                        totalCorredores: totalCorredores,
                    });
                }

                // login correcto
                req.session.loggedIn = true;
                req.session.email = results[0].email;
                req.session.rol = results[0].rol || "runner";
                return res.redirect("/area-privada");
            }
        );
    } catch (err) {
        console.error("Error en postLogin:", err);
        return res.render("login", {
            rol: req.session.rol || null,
            corredores: [],
            podio: [],
            totalCorredores: 0,
            loginError: "Error en el servidor",
        });
    }
};

exports.getLoginAdmin = (req, res) => {
    res.render("login-admin", { rol: req.session.rol || null });
};

exports.postLoginAdmin = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    // console.log(req.body);

    if (email && pass) {
        db.query(
            "SELECT * FROM organizadores WHERE email = ?",
            [email],
            async (error, results) => {
                // console.log("result: ", results);
                if (
                    !results ||
                    results.length == 0 ||
                    pass != results[0].contrasena
                ) {
                    // console.log(results, results.lenght);
                    // console.log("Usuario y/o contraseña incorrectasssssss");
                    return res.render("login-admin", {
                        rol: req.session.rol || null,
                        loginError: "Usuario y/o contraseña incorrectas",
                    });
                } else {
                    // console.log("Conexión exitosa");
                    req.session.loggedIn = true;
                    req.session.email = results[0].email;
                    req.session.rol = "admin";
                    return res.redirect("/area-admin");
                }
            }
        );
    } else {
        // console.log("Introduzca su email y contraseña");
        res.render("login-admin", { rol: req.session.rol || null });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};
