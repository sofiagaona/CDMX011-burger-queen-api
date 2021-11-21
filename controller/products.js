const Products = require('../model/products');

module.exports = {
  read: (req, resp, next) => {
    getProducts(req)
      .then((doc) => {
        resp.status(200).json({ products: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },

  readById: (req, resp, next) => {
    getProductsId(req.params._id)
      .then((doc) => {
        resp.status(200).json({ products: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  create: (req, res, next) => {
    const body = req.body;
    createProduct(body)
      .then((document) => {
        res.status(200).json({ products: document });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  updateProduct: (req, resp, next) => {
    const body = req.body;
    updateProduct(req.params._id, body)
      .then((doc) => {
        resp.status(200).json({ products: doc });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  delete: (req, resp, next) => {
    deleteProduct(req.params._id)
      .then((document) => {
        resp.status(200).json({ products: document });
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
};

async function getProductsId(reqId) {
  const productById = await Products.find({ _id: reqId });
  return productById;
}

async function getProducts(req) {
  const pageOptions = {
    page: req.query.page || 0,
    limit: req.query.limit || 10,
  };
  const getProducts = await Products.find({ estado: true })
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);

  return getProducts;
}

async function createProduct(body) {
  const product = new Products({
    name: body.name,
    price: body.price,
    image: body.image,
    type: body.type,
    dateEntry: body.dateEntry,
  });
  const result = await product.save();
  return result;
}

async function updateProduct(id, body) {
  const productUpdate = await Products.findByIdAndUpdate({ _id: id }, {
    $set: {
      name: body.name,
      price: body.price,
      image: body.image,
      type: body.type,
      dateEntry: body.dateEntry,
    },
  }, { new: true });
  return productUpdate;
}

async function deleteProduct(id) {
  const deleteProduct = await Products.findByIdAndUpdate({ _id: id }, {
    $set: {
      estado: false,
    },
  }, { new: true });
  return deleteProduct;
}
