import express from "express";
import {
  CategoryController,
  CostController,
  OrderController,
  ProductController,
  UserController
} from "../controllers";

let adminApi = express.Router();

let adminApiRoute = (app) => {
  adminApi.get("/user", new UserController().getAll);
  adminApi.post("/user", new UserController().create);
  adminApi.get("/user/query", new UserController().query);
  adminApi.get("/user/:id", new UserController().getOne);
  adminApi.put("/user/:id", new UserController().update);
  adminApi.delete("/user/:id", new UserController().delete);

  adminApi.get("/product", new ProductController().getAll);
  adminApi.post("/product", new ProductController().create);
  adminApi.get("/product/query", new ProductController().query);
  adminApi.put("/product/:id", new ProductController().update);
  adminApi.delete("/product/:id", new ProductController().delete);

  adminApi.get("/category", new CategoryController().getAll);
  adminApi.post("/category", new CategoryController().create);
  adminApi.put("/category/:id", new CategoryController().update);
  adminApi.delete("/category/:id", new CategoryController().delete);

  adminApi.get("/order", new OrderController().getAll);
  adminApi.post("/order", new OrderController().create);
  adminApi.put("/order/:id", new OrderController().update);
  adminApi.delete("/order/:id", new OrderController().delete);

  adminApi.get("/cost", new CostController().getAll);

  return app.use("/api/v1/admin", adminApi);
}

export default adminApiRoute;