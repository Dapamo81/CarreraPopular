const db = require('../config/db');

exports.loadCorredores = (req, res) => {
    db.query('SELECT * FROM corredores', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error en el servidor');
        }
        res.render('area-admin', { corredores: results });
    });
};