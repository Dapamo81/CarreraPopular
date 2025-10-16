const db = require("../config/db");

exports.getAreaPrivada = async (req, res) => {
    const email = req.session.email;
    console.log("Email en área privada:", email);
    if (!email) {
        req.session.error = "Debes iniciar sesión para ver esa página";
        return res.redirect("/auth/login");
    }
    db.query(
        "SELECT * FROM corredores WHERE email = ?",
        [email],
        (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error en el servidor");
            }
            res.render("area-privada", {
                corredores: results,
                rol: req.session.rol || null,
            });
        }
    );
};

exports.postAreaPrivada = async (req, res) => {
    res.redirect("area-privada");
};
