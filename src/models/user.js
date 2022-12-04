const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const user = new Schema(
  {
    user_name: { type: String, required: true },
    full_name: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    avatar: { type: String },
    phone: {
      type: String,
      match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    },
    email: {
      type: String,
      match:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    address: { type: String, default: "" },
    birthday: { type: String },
    verify_phone: { type: Boolean, default: false },
    verify_email: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
user.index({ user_name: 1 }, { unique: true });

user.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

user.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

user.methods.passwordEncryption = function (password, salt, length = 512) {
  console.log("passwordEncryption : ", password, salt);
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, length, "sha512")
    .toString("hex");
  return hash;
};
user.methods.initSaltAndHash = function (password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: hash,
  };
};
user
  .virtual("password")
  .set(function (raw_pass) {
    this._password = raw_pass;
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
      .pbkdf2Sync(raw_pass, this.salt, 10000, 512, "sha512")
      .toString("hex");
  })
  .get(function () {
    return this._password;
  });

// models name - Schema name - collection name
module.exports = mongoose.model("user", user);
