import express from "express";
import cors from "cors";
import { connectDB } from "./db/index.js";

import productRouter from "./services/products/index.js";
import reviewRouter from "./services/reviews/index.js";
import userRouter from "./services/users/index.js";
import categoryRouter from "./services/Category/index.js";

const server = express();

const port = process.env.PORT || 5001;

server.use(express.json());
server.use(cors());

server.use("/products", productRouter);
server.use("/reviews", reviewRouter);
server.use("/users", userRouter);
server.use("/categories", categoryRouter);

const appInit = async () => {
  try {
    server.listen(port, async () => {
      console.log(`working server port is ${port}`);
      await connectDB();
      // await syncDB();
    });
  } catch (error) {}
};

appInit();
