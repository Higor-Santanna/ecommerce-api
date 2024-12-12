import express from "express"
import { UsersController } from "../controllers/users.controller";

const userRoutes = express.Router();

userRoutes.get("/users", UsersController.getAll);

export { userRoutes }