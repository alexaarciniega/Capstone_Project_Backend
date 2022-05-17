const orderService = require("../services/order-service");

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();
    res.setHeader("Total", orders.length);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await orderService.getOrder(id);
    //TO DO. This actually sends an error and not 404
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res) => {
  const newOrder = req.body;

  try {
    const savedOrder = await orderService.createOrder(newOrder);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error." });
  }
};

const updateOrder = async (req, res, next) => {
  const id = req.params.id;
  const orderToUpdate = req.body;

  try {
    const updatedOrder = await orderService.updateOrder(id, orderToUpdate);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order does not exist." });
    }
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    await orderService.deleteOrder(id);
    return res.status(404).json({ message: "Order deleted correctly" });
  } catch (error) {
    next(error);
  }
};




const listProductsOrder = async (req, res, next) => {
    const { id } = req.params;
    try {
      const products = await ProductsService.listProductsOrder(id);
      if (!products) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json(products);
    } catch (error) {
      next(error);
    }
  };
  
  const saveProductOrder = async (req, res, next) => {
    const { id } = req.params;
    const product = req.body;
  
    try {
      const savedProduct = await ProductsService.saveProductOrder(id, product);
  
      if (!savedProduct) {
        return res.status(404).json({ message: "Order not found" });
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
  
  const deleteProductOrder = async (req, res, next) => {
    const { id, productId } = req.params;
  
    try {
      await ProductsService.deleteProductOrder(id, productId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,

  listProductsOrder,
  saveProductOrder,
  deleteProductOrder
};
