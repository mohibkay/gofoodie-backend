const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    order: [
      {
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        toppings: [
          {
            type: String,
          },
        ],
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
    order_total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
