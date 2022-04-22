import express from "express";
import models from "../../db/models/index.js";

const { User } = models;

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const usersList = await User.findAll();
    res.send(usersList);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
userRouter.get("/:id", async (req, res, next) => {
  try {
    const aUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(aUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const updateUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(updateUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({
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

export default userRouter;
