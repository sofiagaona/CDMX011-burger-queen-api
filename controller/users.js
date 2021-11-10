const User = require('../model/model_user');

module.exports = {
  getUsers: (req, resp, next) => {
    users()
      .then((doc) => {
        resp.status(200).json({ valor: doc });
      })
      .catch((err) => {
        resp.status(400).json({ Error: err });
      });
  },

  getUserById: (req, resp) => {
    getUserId(req.params._id)
      .then((doc) => {
        resp.status(200).json({ valor: doc });
      })
      .catch((err) => {
        resp.status(400).json({ Error: err });
      });
  },
  createUsers: (req, res, next) => {
    const body = req.body;
    createUser(body)
      .then((document) => {
        res.status(200).json({ valor: document });
      })
      .catch((err) => {
        res.send(err.message);
      });
  },
  putUser: (req, resp, next) => {
    const body = req.body;
    updateUser(req.params._id, body)
      .then((doc) => {
        resp.status(200).json({ valor: doc });
      })
      .catch((err) => {
        resp.status(400).json({ Error: err });
      });
  },
  deleteUsers: (req, resp, next) => {
    deleteUser(req.params._id)
      .then((document) => {
        resp.status(200).json({ valor: document });
      })
      .catch((err) => {
        resp.status(400).json({ Error: err });
      });
  },
};

async function getUserId(reqId) {
  const userById = await User.find({ _id: reqId });
  return userById;
}

async function users() {
  const getUsers = await User.find({ estado: true });
  return getUsers;
}

async function createUser(body) {
  const user = User({
    email: body.email,
    password: body.password,
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
