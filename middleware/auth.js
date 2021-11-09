const jwt = require('jsonwebtoken');
const config = require('../config');

const { adminEmail, adminPassword } = config;

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
  });
};

module.exports.isAuthenticated = (req) => {
  if (req.body === adminEmail || req.body === adminPassword) {
    return true;
  }
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  return false;
};

module.exports.isAdmin = (req) => {
  if (req.body === adminEmail || req.body === adminPassword) {
    return true;
  }
  return false;
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
