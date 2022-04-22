import express from "express";
import sequelize from "../../db/index.js";
import models from "../../db/models/index.js";

const { Product, User, Review, Category } = models;

const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  try {
    let query = {};

    if (req.query.search) {
      query = {
        [sequelize.Op.or]: [
          {
            name: {
              [sequelize.Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            description: {
              [sequelize.Op.iLike]: `%${req.query.search}%`,
            },
          },
        ],
      };
    }
    const productsList = await Product.findAll({
      include: [Category, { model: Review, include: User }],
      where: query,
      order: [["price", "asc"]],
    });
    res.send(productsList);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
productRouter.get("/:id", async (req, res, next) => {
  try {
    const aProduct = await Product.findByPk(
      { id: req.params.id },
      {
        include: [Category, { model: Review, include: User }],
        Category,
      }
    );
    res.send(aProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(updatedProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    await Product.destroy({
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

export default productRouter;
