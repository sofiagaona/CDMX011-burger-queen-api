const bcrypt = require('bcrypt');
const User = require('../model/model_user');

module.exports = {
  getUsers: (req, resp, next) => {
    users(req)
      .then((doc) => {
        resp.status(200).json({ users: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },

  getUserById: (req, resp, next) => {
    getUserId(req.params)
      .then((doc) => {
        resp.status(200).json({ doc });
        return next();
      })
      .catch((err) => next(err));
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
    updateUser(req.params, body)
      .then((doc) => {
        resp.status(200).json({ users: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  deleteUsers: (req, resp, next) => {
    deleteUser(req.params._id)
      .then((doc) => {
        resp.status(200).json({ doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
};

async function getUserId(req) {
  const userById = await User.find({ _id: req }).select({ email: 1, roles: 1 });
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

async function updateUser(param, body) {
  const value = Object.values(param);
  const update = {
    email: body.email,
    password: body.password,
    roles: body.roles,
    admin: body.admin,
    estado: body.estado,
  };
  const usersEmail = await User.find({ email: value[0] });
  if (usersEmail.length !== 0) {
    const userById = await User.findOneAndUpdate({ email: value[0] }, {
      $set: update,
    }, { new: true });
    return userById;
  }
  if (usersEmail.length === 0) {
    const userUpdate = await User.findOneAndUpdate({ _id: value[0] }, {
      $set: update,
    }, { new: true });
    return userUpdate;
  }

  /* const userUpdate = await User.findOneAndUpdate(({ email: value[0] } || { _id: value[0] }), {
    $set: {
      email: body.email,
      password: body.password,
      roles: body.roles,
      admin: body.admin,
      estado: body.estado,
    },
  }, { new: true });
  console.info(userUpdate);
  return userUpdate; */
}

async function deleteUser(id) {
  const deleteUser = await User.findByIdAndUpdate({ _id: id }, {
    $set: {
      estado: false,
    },
  }, { new: true });
  return deleteUser;
}
