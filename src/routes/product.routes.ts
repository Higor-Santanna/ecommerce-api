import { Router } from "express";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { ProductsController } from "../controllers/product.controller.js";
import { newProductSchema, updateProductSchema } from "../models/product.models.js";

const productRoutes = Router();

productRoutes.get("/products", asyncHandler(ProductsController.getAll));
productRoutes.get("/products/:id", asyncHandler(ProductsController.getById));
productRoutes.post("/products", celebrate({ [Segments.BODY]: newProductSchema }), asyncHandler(ProductsController.save));
productRoutes.put("/products/:id", celebrate({ [Segments.BODY]: updateProductSchema }), asyncHandler(ProductsController.update));
productRoutes.delete("/products/:id", asyncHandler(ProductsController.delete));

export { productRoutes }