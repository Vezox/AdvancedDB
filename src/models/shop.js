const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("shop", shopSchema);
