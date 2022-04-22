import express from "express";
import models from "../../db/models/index.js";

const { Review, User } = models;

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviewsList = await Review.findAll({ include: User });
    res.send(reviewsList);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const aReview = await Review.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(aReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.send(newReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const updateReviews = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(updateReviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default reviewRouter;
