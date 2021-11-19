const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const user = require('../model/model_user');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }
    user.findOne({ email: req.body.email })
      .then((datos) => {
        if (datos) {
          const passwordValido = bcrypt.compareSync(password, datos.password);
          if (!passwordValido) return resp.status(400).json({ error: 'ok', msj: 'el usario o contraseña son incorrestos' });
          const jwtToken = jwt.sign({

            _id: datos._id,
            email: datos.email,
            admin: datos.roles.admin,

          }, secret);
          return resp.json({
            jwtToken,
          });
        }
        next();
      })
      .catch((err) => {
        next(err);
      });
  });

  return nextMain();
};
