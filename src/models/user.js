const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: { type: String, required: true },
    hash: { type: String },
    salt: { type: String },
    avatar: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    birthday: { type: String },
    verify_phone: { type: Boolean },
    verify_email: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

// models name - Schema name - collection name
module.exports = mongoose.model("user", user);
