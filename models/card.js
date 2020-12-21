const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  rhyme: {
    type: String,
    required: true,
    minlength: 2,
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
  dislikes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
    default: 'https://picsum.photos/264/200',
  },
});

module.exports = mongoose.model('card', cardSchema);
