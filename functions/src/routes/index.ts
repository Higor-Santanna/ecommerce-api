import express, { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { authRoutes } from "./auth.routes.js";
import { companyRoutes } from "./companies.routes.js";
import { categoryRoutes } from "./categories.routes.js";
import { productRoutes } from "./product.routes.js";
import { paymentMethodsRoutes } from "./payment-methods.route.js";
import { orderRoutes } from "./order.routes.js";
import { allowAnonymousUser } from "../middlewares/allow-anonymous-user.middleware.js";

const routes = (app: express.Express) => {
    app.use(express.json({limit: "5mb"}));
    app.use(authRoutes);
    app.use(allowAnonymousUser);

    const authenticatedRoutes = Router();
    authenticatedRoutes.use(userRoutes);
    authenticatedRoutes.use(companyRoutes);
    authenticatedRoutes.use(categoryRoutes);
    authenticatedRoutes.use(productRoutes);
    authenticatedRoutes.use(paymentMethodsRoutes);
    authenticatedRoutes.use(orderRoutes);
    app.use(
        // #swagger.security = [{ "bearerAuth": [] }]
        authenticatedRoutes
    );
};

export { routes }