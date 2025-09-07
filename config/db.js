const mysql = require('mysql2');
require('dotenv').config();

const connexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connexion.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }else{
    console.log('Conexión a la base de datos establecida');
  }
});

module.exports = connexion;