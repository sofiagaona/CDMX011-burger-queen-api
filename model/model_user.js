const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: Object, required: true },
  // admin: { type: Boolean, required: true },
  estado: { type: Boolean, default: true },
});
module.exports = mongoose.model('User', userSchema);
