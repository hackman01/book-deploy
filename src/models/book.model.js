const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    minlength: 3
  },
  exchanged: {
    type: Boolean,
    default: false
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Book', bookSchema)