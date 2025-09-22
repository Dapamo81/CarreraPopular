const bcrypt = require('bcrypt');

exports.getRegister = (req, res) => {
  res.render('register', {rol: req.session.rol || null });
};

exports.postRegister = async (req, res) => {
  const { username, apellidos, dni, telefono, direccion, poblacion,cp, password, email } = req.body;
  if (!username || !password || !apellidos || !dni || !telefono || !direccion || !poblacion || !cp || !email) {
    req.session.error = 'Todos los campos son obligatorios';
    return res.redirect('/register');
  }
  try {
    const [rows, fields] = await req.pool.promise().query('SELECT * FROM corredores WHERE nombre = ?', [username]);
    if (rows.length > 0) {
      req.session.error = 'El usuario ya existe';
      return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await req.pool.promise().query('INSERT INTO corredores (dni, nombre, apellidos, telefono, direccion, poblacion, cp, email, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, apellidos, hashedPassword]);
    console.log('Usuario registrado:', username);

    req.session.success = 'Registro exitoso. Ya puedes iniciar sesión';
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    req.session.error = 'Error en el servidor';
    res.redirect('/register');
  }
};