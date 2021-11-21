const bcrypt = require('bcrypt');
const User = require('../model/model_user');

module.exports = {
  getUsers: (req, resp, next) => {
    users(req)
      .then((doc) => {
        resp.status(200).json({ valor: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },

  getUserById: (req, resp, next) => {
    getUserId(req.params._id)
      .then((doc) => {
        resp.status(200).json({ valor: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  createUsers: (req, res, next) => {
    const body = req.body;
    createUser(body)
      .then((document) => {
        res.status(200).json({ email: document.email, roles: document.roles });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  putUser: (req, resp, next) => {
    const body = req.body;
    updateUser(req.params._id, body)
      .then((doc) => {
        resp.status(200).json({ email: doc.email, roles: doc.roles });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  deleteUsers: (req, resp, next) => {
    deleteUser(req.params._id)
      .then((document) => {
        resp.status(200).json({ email: document.email, roles: document.roles });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
};

async function getUserId(reqId) {
  const userById = await User.find({ _id: reqId }).select({ email: 1, roles: 1 });
  return userById;
}

async function users(req) {
  const pageOptions = {
    page: req.query.page || 0,
    limit: req.query.limit || 10,
  };
  const getUsers = await User.find({ estado: true })
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .select({ email: 1, roles: 1 });
  return getUsers;
}

async function createUser(body) {
  const user = new User({
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    roles: body.roles,
    admin: body.admin,
  });
  const result = await user.save();
  return result;
}

async function updateUser(id, body) {
  const userUpdate = await User.findByIdAndUpdate({ _id: id }, {
    $set: {
      email: body.email,
      password: body.password,
      roles: body.roles,
      admin: body.admin,
      estado: body.estado,
    },
  }, { new: true });
  return userUpdate;
}

async function deleteUser(id) {
  const userDelete = await User.findByIdAndUpdate({ _id: id }, {
    $set: {
      estado: false,
    },
  }, { new: true });
  return userDelete;
}
