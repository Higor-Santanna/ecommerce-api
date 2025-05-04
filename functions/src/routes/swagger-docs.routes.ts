import { Express, NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
// import swaggerFile from "./../docs/swagger-output.json" assert {type: "json"};
//const swaggerFile = require("../docs/swagger-output.json")

import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerFile = JSON.parse(
  await readFile(resolve(__dirname, "./../docs/swagger-output.json"), "utf-8")
);

export const swaggerDocs = (app: Express) => {
    app.use ((req: Request, res: Response, next: NextFunction) => {
        if (req.path === "/docs"){
            return res.redirect("/api/docs/");
        }
        next()
    })
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
};
