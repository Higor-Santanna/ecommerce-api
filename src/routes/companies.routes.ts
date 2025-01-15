import { Router } from "express"
import { CompaniesController } from "../controllers/companies.controller.js";
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from "celebrate";
import { newCompanySchema, updateCompanySchema } from "../models/company.models.js";

const companyRoutes = Router();

companyRoutes.get("/companies", asyncHandler(CompaniesController.getAll));
companyRoutes.post("/companies", celebrate({[Segments.BODY]: newCompanySchema}),asyncHandler(CompaniesController.save));
companyRoutes.get("/companies/:id", asyncHandler(CompaniesController.getById));
companyRoutes.put("/companies/:id", celebrate({[Segments.BODY]: updateCompanySchema}), asyncHandler(CompaniesController.update));

export { companyRoutes }