const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productScheme = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  article: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  answer: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  availability: { type: String, required: true },
  discountPrice: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 3000,
    trim: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
    // require: true,
  },
  category: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  manufacturer: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
});
//Створення моделі
const ProductModel = mongoose.model("Product", productScheme);

module.exports = ProductModel;
