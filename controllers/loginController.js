const db = require('../config/db');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
 const email = req.body.email;
    const pass = req.body.password;
    console.log(req.body);

    if (email && pass) {
        db.query(
            'SELECT * FROM organizadores WHERE email = ?',
            [email],
            async (error, results) => {
                console.log("result: ", results);
                if (
                    !results || results.length == 0 || pass != results[0].contrasena
                ) {
                    console.log(req.body);
                    console.log("Usuario y/o contraseña incorrectas");
                    return res.render("login", {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o contraseña incorrectas",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        ruta: "login",
                        login : false,
                        titulo: "Login"
                    });
                } else {
                    console.log("Conexión exitosa");
                    req.session.loggedIn = true;
                    req.session.email = results[0].email;
                    return res.redirect('/corredores');
                   
                }
                    }
        );
    }else{
        console.log("Introduzca su usuario y contraseña");
        res.render("login", {
            alert: true,
            alertTitle: "Login",
            alertMessage: "Introduzca su usuario y contraseña",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 2500,
            ruta: "",
            login: false,
            titulo: "Login",
        });
    }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};