import express from "express";
import { initializeApp as initializeAdmin} from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware.js";
import { auth } from "./middlewares/auth.middleware.js";

initializeAdmin();
initializeFirebaseApp({
    apiKey: process.env.FIRE_API_KEY
});

const app = express();
const port = 3000;

auth(app);
routes(app);
pageNotFoundHandler(app)
errorHandler(app)

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});