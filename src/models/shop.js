const mongoose = require('mongoose')
const Schema = mongoose.Schema


const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
})

module.exports = mongoose.model("shop", shopSchema)