import express from "express";
import { initializeApp } from 'firebase-admin/app';
import { routes } from "./routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";

const app = express();
const port = 3000;

initializeApp();
routes(app);
pageNotFoundHandler(app)
errorHandler(app)

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});