import express from "express"
import { UsersController } from "../controllers/users.controller";
import asyncHandler from 'express-async-handler';

const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll));
userRoutes.post("/users", asyncHandler(UsersController.save));
userRoutes.get("/users/:id", asyncHandler(UsersController.getById));
userRoutes.put("/users/:id", asyncHandler(UsersController.update));
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete));

export { userRoutes }