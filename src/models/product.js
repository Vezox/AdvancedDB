const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variant",
      required: true,
    },
    stop: {
      type: Boolean,
      default: false,
    },
    is_new: {
      type: Boolean,
      default: false,
    },
    vat: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
