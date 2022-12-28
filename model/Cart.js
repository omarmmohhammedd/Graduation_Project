const mongoose = require("mongoose");
const { connectProducts } = require("../config/DBconfig")
const cartSechema = connectProducts.model(
  "Cart",
  new mongoose.Schema(
    {
      userId: {
        type: String,
        ref: "Users",
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
          totalPrice: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
module.exports = cartSechema; 