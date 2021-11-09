const User = require('../model/model_user');

module.exports = {
  getUsers: (req, resp, next) => {
    users()
      .then((doc) => {
        resp.status(400).json({ valor: doc });
      })
      .catch((err) => {
        resp.status(400).json({ Error: err });
      });
  },
};

async function users() {
  const getUsers = await User.find({ estado: true });
  return getUsers;
}
