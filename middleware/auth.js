const jwt = require('jsonwebtoken');
const User = require('../model/model_user');

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
    req.local = decodedToken;
    const id = decodedToken._id;
    if (err) {
      return next(403);
    }

    // module.exports.isAuthenticated(req, id);
    module.exports.id = { id };
    return next();

    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
  });
};

module.exports.isAuthenticated = (req) => (
  !(!req.local)
  /* const userId = await User.findOne({ _id: id });
  if (userId === null) { return false; }
  return true; */
);
// TODO: decidir por la informacion del request si la usuaria esta autenticada
// false

module.exports.isAdmin = (req) => (
  !!(req.local.admin)
  // TODO: decidir por la informacion del request si la usuaria es admin
  // false
);

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
