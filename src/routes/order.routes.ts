import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { newOrderSchema, searchParamsOrderQuerySchema } from "../models/order.model.js";
import { OrdersController } from "../controllers/order.controller.js";
import expressAsyncHandler from "express-async-handler";

const orderRoutes = Router();

orderRoutes.post("/orders", celebrate({ [Segments.BODY]: newOrderSchema }), expressAsyncHandler(OrdersController.save));

orderRoutes.get("/orders", celebrate({ [Segments.QUERY]: searchParamsOrderQuerySchema}), expressAsyncHandler(OrdersController.search));

orderRoutes.get("/orders/:id/items", expressAsyncHandler(OrdersController.getItems));

export { orderRoutes }