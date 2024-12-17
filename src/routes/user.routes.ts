import express from "express"
import { UsersController } from "../controllers/users.controller";
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from "celebrate";
import { userSchema } from "../models/user.models";

const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll));
userRoutes.post("/users", celebrate({[Segments.BODY]: userSchema}),asyncHandler(UsersController.save));
userRoutes.get("/users/:id", asyncHandler(UsersController.getById));
userRoutes.put("/users/:id", celebrate({[Segments.BODY]: userSchema}), asyncHandler(UsersController.update));
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete));

export { userRoutes }