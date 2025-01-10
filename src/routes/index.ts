import express from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";
import { companyRoutes } from "./companies.routes";

const routes = (app: express.Express) => {
    app.use(express.json({limit: "5mb"}));
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(companyRoutes);
};

export { routes }