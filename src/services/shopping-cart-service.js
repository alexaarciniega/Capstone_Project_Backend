const ShoppingCart = require("../models/shoppingCart");

const createShoppingCart = async (shoppingCart) => {
    const newShoppingCart = new ShoppingCart(shoppingCart);
    await newShoppingCart.save();
    return newShoppingCart;
}

const getShoppingCarts = async () => {
    const shoppingCarts = await ShoppingCart.find().lean().exec();
    return shoppingCarts;
}

const getShoppingCart = async (id) => {
    const shoppingCart = await ShoppingCart.findById(id).lean().exec();
    return shoppingCart;
}

const deleteShoppingCart = async (id) => {
    await ShoppingCart.findByIdAndDelete(id).exec();
}

const updateShoppingCart = async (id, shoppingCart) => {
    const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(id, shoppingCart, {
        returnDocument: "after"
    }).lean().exec();

    return updatedShoppingCart;
}



const listProducts = async (id) => {
  const shoppingCart = await ShoppingCart.findById(id).lean().exec();
  return shoppingCart?.products;
};

const saveProduct = async (id, product) => {
  const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(
    id,
    { $addToSet: { products: product } },
    { returnDocument: "after" }
  )
    .lean()
    .exec();

  if (!updatedShoppingCart) {
    return;
  }

  const products = updatedShoppingCart.products;

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
  await ShoppingCart.findOneAndUpdate(
    { _id: id },
    { $pull: { products: { _id: productId } } }
  );
};

module.exports = {
    createShoppingCart,
    getShoppingCarts,
    getShoppingCart,
    deleteShoppingCart,
    updateShoppingCart,

    listProducts,
    saveProduct,
    /*updateComment,*/
    deleteProduct,
};