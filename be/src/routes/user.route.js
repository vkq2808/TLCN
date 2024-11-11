import express from "express";
import {
  UserController
} from "../controllers";

let userAPI = express.Router();

let userAPIRoute = (app) => {
  userAPI.get("/get-user-info", new UserController().getUserByToken);
  return app.use("/api/v1/user", userAPI);
}

export default userAPIRoute;