const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversation = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'shop',
      required: true,
    },
    last_message: { type: String },
    unread: { type: Number, default: 0 },
    last_seen: { type: Number },
}, {
    timestamps: true
})

module.exports = mongoose.model('conversation', conversation)