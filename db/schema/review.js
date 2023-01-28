const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = {
  Review,
};
