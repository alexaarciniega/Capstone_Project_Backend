const mongoose = require("mongoose");

const ShoppingCartSchema = new mongoose.Schema(
    {
      products: [
        {
          id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          imgUrl: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
          price: {
            type: Number,
            required: true,
          }
        }
      ],
    },
    { timestamps: true }
  );

const ShoppingCartModel = mongoose.model("ShoppingCart", ShoppingCartSchema);
module.exports = ShoppingCartModel;