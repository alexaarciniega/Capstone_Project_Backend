const productService = require("../services/product-service");

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.setHeader("Total", products.length);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await productService.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res) => {
  const newProduct = req.body;

  try {
    const savedProduct = await productService.createProduct(newProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error." });
  }
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const productToUpdate = req.body;

  try {
    const updatedProduct = await productService.updateProduct(id, productToUpdate);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product does not exist." });
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    await productService.deleteProduct(id);
    return res.status(404).json({ message: "Product deleted correctly" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
