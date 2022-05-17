const Order = require("../models/order");

const createOrder = async (order) => {
    const newOrder = new Order(order);
    await newOrder.save();
    return newOrder;
}

const getOrders = async () => {
    const orders = await Order.find().lean().exec();
    return orders;
}

const getOrder = async (id) => {
    const order = await Order.findById(id).lean().exec();
    return order;
}

const deleteOrder = async (id) => {
    await Order.findByIdAndDelete(id).exec();
}

const updateOrder = async (id, order) => {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, {
        returnDocument: "after"
    }).lean().exec();

    return updatedOrder;
}



const listProducts = async (id) => {
  const order = await Order.findById(id).lean().exec();
  return order?.products;
};

const saveProduct = async (id, product) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { $addToSet: { products: product } },
    { returnDocument: "after" }
  )
    .lean()
    .exec();

  if (!updatedOrder) {
    return;
  }

  const products = updatedOrder.products;

  return products[products.length - 1];
};

/*const updateComment = async (id, commentId, comment) => {
  const updatedPost = await Post.findOneAndUpdate(
    { _id: id, "comments._id": commentId },
    {
      $set: {
        "comments.$.author": comment.author,
        "comments.$.comment": comment.comment,
      },
    },
    { returnDocument: "after" }
  );

  if (!updatedPost) {
    return;
  }*/

  /*const updatedComment = updatedPost.comments.find(
    (comment) => comment._id.toString() === commentId
  );

  return updatedComment;
};*/

const deleteProduct = async (id, productId) => {
  await Order.findOneAndUpdate(
    { _id: id },
    { $pull: { products: { _id: productId } } }
  );
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder,

    listProducts,
    saveProduct,
    /*updateComment,*/
    deleteProduct,
};