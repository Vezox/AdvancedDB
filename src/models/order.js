const Schema = require("mongoose").Schema;
const productModel = require("../models/product");

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  shop_id: {
    type: Schema.Types.ObjectId,
    ref: "shop",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "delivered"],
    default: "pending",
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
});

module.exports = require("mongoose").model("order", orderSchema);
