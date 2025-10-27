const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
    res.render("login", { rol: req.session.rol || null });
};

exports.postLogin = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    console.log("******************************************************");
    console.log(req.body);

    if (email && pass) {
        db.query(
            "SELECT * FROM corredores WHERE email = ?",
            [email],
            async (error, results) => {
                // console.log("result: ", results[0].contrasena);
                // console.log("pass: ", pass);
                if (
                    !results ||
                    results.length == 0 ||
                    !(await bcrypt.compare(pass, results[0].contrasena))
                ) {
                    // console.log(results, results.length);
                    // console.log("Usuario y/o contraseña incorrectas");
                    return res.render("login", {
                        rol: req.session.rol || null,
                        loginError: "Usuario y/o contraseña incorrectas",
                        corredores: results,
                        podio: podioResults,
                        totalCorredores: totalCorredores,
                    });
                } else {
                    console.log("Conexión exitosa");
                    req.session.loggedIn = true;
                    req.session.email = results[0].email;
                    req.session.rol = "runner";
                    return res.redirect("/area-privada");
                }
            }
        );
    } else {
        console.log("Introduzca su usuario y contraseña");
        res.render("login", {
            // alert: true,
            // alertTitle: "Login",
            // alertMessage: "Introduzca su usuario y contraseña",
            // alertIcon: "success",
            // showConfirmButton: false,
            // timer: 2500,
            // ruta: "",
            // login: false,
            // titulo: "Login",
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
