import express from "express";
import { userRoutes } from "./user.routes.js";
import { authRoutes } from "./auth.routes.js";
import { companyRoutes } from "./companies.routes.js";
import { categoryRoutes } from "./categories.routes.js";

const routes = (app: express.Express) => {
    app.use(express.json({limit: "5mb"}));
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(companyRoutes);
    app.use(categoryRoutes);
};

export { routes }