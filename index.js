const express = require('express');
const mongoose = require('mongoose');
const { Review } = require('./db/schema/review');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { DB_URL } = process.env;

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);

mongoose.set('strictQuery', false);
mongoose.connect(DB_URL);

const port = 80;

app.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const reviews = await Review.find({ userId });

  res.send(reviews);
});

app.get('/', async (req, res) => {
  const reviews = await Review.find({});

  res.send(reviews);
});

app.post('/', async (req, res) => {
  try {
    const {
      rating = null,
      userId = null,
      comment = null,
      food = null,
    } = req.body;

    let review = await Review.findOne({ userId, food });

    if (!review) {
      review = new Review({
        rating,
        userId,
        food,
      });
    } else {
      if (rating) review.rating = rating;
      if (comment) review.comment = comment;
    }

    await review.save();
    res.send({
      message: 'Success',
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
