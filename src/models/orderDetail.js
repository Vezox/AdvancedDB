const Schema = require("mongoose").Schema;
const productModel = require("../models/product");

const orderDetailSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

orderDetailSchema.pre("validate", async function () {
  const productDoc = await productModel.findOne({
    _id: this.product,
    quantity: { $gte: this.quantity },
  });
  if (!productDoc) {
    throw new Error(`${this.product}: Vuot qua so luong`);
  }
  productDoc.quantity -= this.quantity;
  productDoc.sold += this.quantity;
  await productDoc.save();
});


module.exports = require("mongoose").model("order_details", orderDetailSchema);
