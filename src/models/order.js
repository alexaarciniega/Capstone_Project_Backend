const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      }, 
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
  
  const OrderModel = mongoose.model("Order", OrderSchema);
  module.exports = OrderModel;