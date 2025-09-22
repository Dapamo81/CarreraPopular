const db = require('../config/db');

exports.getLoadPodio = (req, res) => {

     const podioQuery = `
        SELECT id_corredor, posicion, c.nombre, c.apellidos
        FROM podio 
        JOIN corredores c ON id_corredor = c.id
        `;

    db.query(podioQuery, (error, podioResults) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error en el servidor');
        }
        console.log(podioResults);
        res.render('podio', { podio: podioResults });
    });
};