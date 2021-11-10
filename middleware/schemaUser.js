module.exports = (schema) => {
  const result = async (req, res, next) => {
    try {
      await schema.validateAsync({ email: req.body.email, password: req.body.password });
      next();
    } catch (error) {
      res.send(error.message);
    }
  };
  return result;
};
