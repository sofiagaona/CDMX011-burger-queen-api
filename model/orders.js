const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  qty: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: { type: Object, required: true },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cliente: { type: String, required: true },
  products: [productsSchema],
  status: { type: String, required: true },
  dateEnry: { type: Date, default: Date.now },
  dateProcessed: { type: Date },
  estado: { type: Boolean, default: true },
});
module.exports = mongoose.model('Orders', orderSchema);
