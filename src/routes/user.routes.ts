import express from "express"
import { UsersController } from "../controllers/users.controller";

const userRoutes = express.Router();

userRoutes.get("/users", UsersController.getAll);
userRoutes.post("/users", UsersController.save)
userRoutes.get("/users/:id", UsersController.getById);
userRoutes.put("/users/:id", UsersController.update);
userRoutes.delete("/users/:id", UsersController.delete);

export { userRoutes }