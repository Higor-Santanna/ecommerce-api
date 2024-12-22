import express from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";

const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(authRoutes);
    app.use(userRoutes);
};

export { routes }