const db = require("../config/db");
const util = require("util");
const query = util.promisify(db.query).bind(db);

const podioQuery = `
  SELECT p.id_corredor, p.posicion, c.nombre, c.apellidos
  FROM podio p
  JOIN corredores c ON p.id_corredor = c.id
  ORDER BY p.posicion ASC
`;

exports.getCorredores = async () => {
    return await query("SELECT * FROM corredores");
};

exports.getPodio = async () => {
    return await query(podioQuery);
};

exports.getTotalCorredores = async () => {
    const rows = await query("SELECT COUNT(*) AS total FROM corredores");
    return rows && rows[0] ? rows[0].total : 0;
};

exports.getInfoCarrera = async (req, res) => {
    try {
        const [corredores, podioResults, total] = await Promise.all([
            exports.getCorredores(),
            exports.getPodio(),
            exports.getTotalCorredores(),
        ]);

        res.render("index", {
            corredores: corredores,
            podio: podioResults,
            totalCorredores: total,
            rol: req.session.rol || null,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error en el servidor");
    }
};
