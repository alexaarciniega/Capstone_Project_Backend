const shoppingCartService = require("../services/shopping-cart-service");

const getShoppingCarts = async (req, res, next) => {
  try {
    const shoppingCarts = await shoppingCartService.getShoppingCarts();
    res.setHeader("Total", shoppingCarts.length);
    res.json(shoppingCarts);
  } catch (error) {
    next(error);
  }
};

const getShoppingCart = async (req, res, next) => {
  const id = req.params.id;
  try {
    const shoppingCart = await shoppingCartService.getShoppingCart(id);
    //TO DO. This actually sends an error and not 404
    if (!shoppingCart) {
      return res.status(404).json({ message: "Shopping Cart not found" });
    }
    res.json(shoppingCart);
  } catch (error) {
    next(error);
  }
};

const createShoppingCart = async (req, res) => {
  const newShoppingCart = req.body;

  try {
    const savedShoppingCart = await shoppingCartService.createShoppingCart(newShoppingCart);
    res.status(201).json(savedShoppingCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error." });
  }
};

const updateShoppingCart = async (req, res, next) => {
  const id = req.params.id;
  const shoppingCartToUpdate = req.body;

  try {
    const updatedShoppingCart = await shoppingCartService.updateShoppingCart(id, shoppingCartToUpdate);
    if (!updatedShoppingCart) {
      return res.status(404).json({ message: "Shopping cart does not exist." });
    }
    res.json(updatedShoppingCart);
  } catch (error) {
    next(error);
  }
};

const deleteShoppingCart = async (req, res, next) => {
  const id = req.params.id;
  try {
    await shoppingCartService.deleteShoppingCart(id);
    return res.status(404).json({ message: "Shopping cart deleted correctly" });
  } catch (error) {
    next(error);
  }
};




const listProductsShoppingCart = async (req, res, next) => {
    const { id } = req.params;
    try {
      const products = await ProductsService.listProductsShoppingCart(id);
      if (!products) {
        return res.status(404).json({ message: "Shopping cart not found" });
      }
  
      res.json(products);
    } catch (error) {
      next(error);
    }
  };
  
  const saveProductShoppingCart = async (req, res, next) => {
    const { id } = req.params;
    const product = req.body;
  
    try {
      const savedProduct = await ProductsService.saveProductShoppingCart(id, product);
  
      if (!savedProduct) {
        return res.status(404).json({ message: "Shopping cart not found" });
      }
  
      res.status(201).json(savedProduct);
    } catch (error) {
      next(error);
    }
  };
  
  /*const updateProduct = async (req, res, next) => {
    const { id, productId } = req.params;
    const newProductData = req.body;
  
    try {
      const updatedProduct = await ProductsService.updateProduct(
        id,
        productId,
        newProductData
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Shopping cart or product not found" });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  };*/
  
  const deleteProductShoppingCart = async (req, res, next) => {
    const { id, productId } = req.params;
  
    try {
      await ProductsService.deleteProductShoppingCart(id, productId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getShoppingCarts,
  getShoppingCart,
  createShoppingCart,
  updateShoppingCart,
  deleteShoppingCart,

  listProductsShoppingCart,
  saveProductShoppingCart,
  deleteProductShoppingCart
};
