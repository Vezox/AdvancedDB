const Schema = require("mongoose").Schema;
const productModel = require("../models/product");

const orderDetailSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
});

orderDetailSchema.pre("validate", async function () {
  const productDoc = await productModel.findOne({
    _id: this.product_id,
    quantity: { $gte: this.quantity },
  });
  if (!productDoc) {
    throw new Error(`${this.product_id}: Vuot qua so luong`);
  }
  productDoc.quantity -= this.quantity;
  productDoc.sold += this.quantity;
  await productDoc.save();
});

module.exports = require("mongoose").model("order_details", orderDetailSchema);
