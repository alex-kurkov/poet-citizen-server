const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 100,
    maxlength: 3000,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
