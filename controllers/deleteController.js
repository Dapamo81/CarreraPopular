const db = require('../config/db');

exports.getDeleteCorredor = (req, res) => {

    const id = req.params.id;

    db.query('DELETE FROM corredores WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al borrar el corredor');
        }else{
            console.log('Corredor borrado con éxito');
            res.redirect('/area-admin');
        }
    });

    
}