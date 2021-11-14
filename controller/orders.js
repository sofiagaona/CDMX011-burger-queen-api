const Orders = require('../model/orders');

module.exports = {
  read: (req, resp, next) => {
    readOrders()
      .then((doc) => {
        resp.status(200).json({ valor: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  readById: (req, resp, next) => {
    readOrdersById(req.params._id)
      .then((doc) => {
        resp.status(200).json({ valor: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  create: (req, resp, next) => {
    const body = req.body;
    createOrder(body)
      .then((doc) => {
        resp.status(200).json({ valor: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  update: (req, resp, next) => {
    updateOrders(req.params._id, req.body)
      .then((doc) => {
        resp.status(200).json({ valor: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  deleteOrder: (req, resp, next) => {
    deleteOrders(req.params._id)
      .then((doc) => {
        resp.status(200).json({ valor: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
};

async function readOrders() {
  const orders = await Orders.find({ estado: true });
  return orders;
}

async function readOrdersById(id) {
  const orderById = await Orders.findById(id);
  return orderById;
}

async function createOrder(body) {
  const order = Orders({
    userId: body.userId,
    cliente: body.cliente,
    products: body.products,
    product: body.products.product,
    cantidad: body.products.cantidad,
    status: body.status,
    dateEnry: body.dateEntry,
    dateProcessed: body.dateProcessed,
  });
  const result = await order.save();
  return result;
}

async function updateOrders(id, body) {
  const updateOrder = await Orders.findByIdAndUpdate({ _id: id }, {
    $set: {
      userId: body.userId,
      cliente: body.cliente,
      products: body.products,
      product: body.products.product,
      cantidad: body.products.cantidad,
      status: body.status,
      dateEnry: body.dateEntry,
      dateProcessed: body.dateProcessed,

    },
  }, { new: true });
  return updateOrder;
}

async function deleteOrders(id) {
  const deleteOrder = await Orders.findByIdAndUpdate({ _id: id }, {
    $set: {
      estado: false,
    },
  }, { new: true });
  return deleteOrder;
}
