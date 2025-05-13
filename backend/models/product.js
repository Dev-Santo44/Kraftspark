const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  post_title: String,
  price: Number,
  imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);
