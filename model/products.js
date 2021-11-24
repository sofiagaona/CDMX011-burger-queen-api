const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({

  name: { type: String },
  price: { type: Number },
  image: { type: String },
  type: { type: String },
  dateEntry: { type: Date, default: Date },
  status: { type: Boolean, default: true },

});

module.exports = mongoose.model('Products', productsSchema);
