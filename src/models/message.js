const mongoose = require('mongoose')
const Schema = mongoose.Schema


const attachment = new Schema({
  value: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
})

const message = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'shop',
      required: true,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'conversation',
      required: true,
    },
    message: { type: String },
    attachments: [attachment],
}, {
    timestamps: true
})

module.exports = mongoose.model('message', message)