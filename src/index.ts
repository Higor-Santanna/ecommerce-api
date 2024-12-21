import express from "express";
import { initializeApp as initializeAdmin} from 'firebase-admin/app';
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";

initializeAdmin();
initializeFirebaseApp({
    apiKey: process.env.FIRE_API_KEY
});

const app = express();
const port = 3000;

routes(app);
pageNotFoundHandler(app)
errorHandler(app)

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});