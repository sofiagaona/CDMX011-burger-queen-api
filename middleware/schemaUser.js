const User = require('../model/model_user');

module.exports = (schema) => {
  const result = async (req, res, next) => {
    const userByEmail = await User.find({ email: req.body.email });
    console.info(userByEmail);
    if (userByEmail.length > 0) {
      res.status(400).json({ error: 'el usario ya existe' });
    } else {
      try {
        await schema.validateAsync({ email: req.body.email, password: req.body.password });
        next();
      } catch (error) {
        next(error);
        // res.send(error.message);
      }
    }
  };
  return result;
};
