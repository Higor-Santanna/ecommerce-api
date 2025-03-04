import { Router } from "express";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { CategoriesController } from "../controllers/categories.controller.js";
import { newCategorySchema, updateCategorySchema } from "../models/category.model.js";

const categoryRoutes = Router();

categoryRoutes.get("/categories", asyncHandler(CategoriesController.getAll));
categoryRoutes.get("/categories/:id", asyncHandler(CategoriesController.getById));
categoryRoutes.post("/categories", celebrate({ [Segments.BODY]: newCategorySchema }), asyncHandler(CategoriesController.save));
categoryRoutes.put("/categories/:id", celebrate({ [Segments.BODY]: updateCategorySchema }), asyncHandler(CategoriesController.update));
categoryRoutes.delete("/categories/:id", asyncHandler(CategoriesController.delete));

export { categoryRoutes }