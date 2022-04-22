import express from "express";
import models from "../../db/models/index.js";

const { Category, ProductCategory } = models;

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res, next) => {
  try {
    const reviewsList = await Category.findAll();
    res.send(reviewsList);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
categoryRouter.get("/:id", async (req, res, next) => {
  try {
    const aUser = await Category.findByPk({ id: req.params.id });
    res.send(aUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.post("/:productId/:categoryId", async (req, res, next) => {
  try {
    const assignCategory = await ProductCategory.create({
      categoryId: req.params.categoryId,
      productId: req.params.productId,
    });

    res.send(assignCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.post("/", async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.send(newCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.put("/:id", async (req, res, next) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(updateCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.delete("/:id", async (req, res, next) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log("deletion successful");
    res.send("deletion successful");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default categoryRouter;
