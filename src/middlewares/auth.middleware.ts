import express, {Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";

export const auth = (app: express.Express) =>{
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if (req.method === "POST" && req.url.endsWith("/auth/login")){
            return next();
        };

        const token = req.headers.authorization?.split("Bearer ")[1]; //Nesse ponto pegamos o nosso token no entanto ele vem com dois parâmetros e nós precisamos apenas do token. Para isso utilizamos o split que quebra o esse arquivo em duas partes separando o Bearer do token.

        if(token){
            try {
                const decodeIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true) //verifica se o token é válido
                console.log(decodeIdToken)
                return next();
            } catch (error) {
                next(new UnauthorizedError());
            };
        };

        next(new UnauthorizedError()); //Caso o usuário não envie o token ele cai nesse erro. 
    });
};