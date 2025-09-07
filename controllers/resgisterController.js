const bcrypt = require('bcrypt');

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    req.session.error = 'Todos los campos son obligatorios';
    return res.redirect('/auth/register');
  }
  try {
    const [rows] = await req.pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (rows.length > 0) {
      req.session.error = 'El usuario ya existe';
      return res.redirect('/auth/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await req.pool.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, hashedPassword]);

    req.session.success = 'Registro exitoso. Ya puedes iniciar sesión';
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    req.session.error = 'Error en el servidor';
    res.redirect('/auth/register');
  }
};