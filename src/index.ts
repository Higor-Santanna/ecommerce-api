import express from "express";
import { initializeApp } from 'firebase-admin/app';
import { routes } from "./routes";

const app = express();
const port = 3000;

initializeApp();
routes(app);

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});