import { Router } from "express"
import { CompaniesController } from "../controllers/companies.controller";
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from "celebrate";
import { companySchema } from "../models/company.models";

const companyRoutes = Router();

companyRoutes.get("/companies", asyncHandler(CompaniesController.getAll));
companyRoutes.post("/companies", celebrate({[Segments.BODY]: companySchema}),asyncHandler(CompaniesController.save));
companyRoutes.get("/companies/:id", asyncHandler(CompaniesController.getById));
companyRoutes.put("/companies/:id", celebrate({[Segments.BODY]: companySchema}), asyncHandler(CompaniesController.update));

export { companyRoutes }