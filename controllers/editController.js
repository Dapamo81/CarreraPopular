const db = require('../config/db');

exports.getLoadCorredor = (req, res) => {

    const email = req.params.email;

    db.query('SELECT * FROM corredores WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }
        if (results.length === 0) {
            return res.status(404).send('Corredor no encontrado');
        }
        res.render('edit', { corredor: results[0] });
    });
};

exports.postUploadCorredor = (req, res) => {

    const id = req.body.id;
    const dni = req.body.dni;
    const nombre = req.body.username;
    const apellidos = req.body.apellidos;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const poblacion = req.body.poblacion;
    const cp = req.body.cp;
    const email = req.body.email;
    const contrasena = req.body.password;

    console.log (req.body);

    db.query('UPDATE corredores SET ? WHERE email = ?',[{
        id: id,
        dni: dni,
        nombre: nombre,
        apellidos: apellidos,
        telefono: telefono,
        direccion: direccion,
        poblacion: poblacion,
        cp: cp,
        email: email,
        contrasena: contrasena,
    }, 
    email], 
    (err, results) => {
        if (err) {
            console.error(err);
            return redirect('/area-admin');
        }else{
            console.log('Corredor actualizado correctamente');
            res.redirect('/area-admin');

        }
    }); 
    
}