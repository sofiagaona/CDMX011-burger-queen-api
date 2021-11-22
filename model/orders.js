const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: Object, required: true },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cliente: { type: String, required: true },
  products: [{
    product: { type: String, required: true },
    qty: { type: Number, required: false },
  }],
  status: { type: String, required: true },
  dateEnry: { type: Date, default: Date.now },
  dateProcessed: { type: Date },
  estado: { type: Boolean, default: true },
});
module.exports = mongoose.model('Orders', orderSchema);
