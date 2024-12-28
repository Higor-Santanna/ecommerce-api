import express, {Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { UserService } from "../services/user.service";
import { ForbiddenError } from "../errors/forbidden.error";

export const auth = (app: express.Express) =>{
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if (req.method === "POST" && (req.url.endsWith("/auth/login") || req.url.endsWith("/auth/recovery"))){
            return next();
        };

        const token = req.headers.authorization?.split("Bearer ")[1]; //Nesse ponto pegamos o nosso token no entanto ele vem com dois parâmetros e nós precisamos apenas do token. Para isso utilizamos o split que quebra o esse arquivo em duas partes separando o Bearer do token.

        if(token){
            try {
                const decodeIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true) //verifica se o token é válido
                console.log("Aqui tem todas as informações: ",decodeIdToken)

                const user = await new UserService().getById(decodeIdToken.uid);
                console.log("Aqui é só o UID: ", user);

                if(!user){
                    return next(new ForbiddenError());
                }
                req.user = user;

                return next();
            } catch (error) {
                next(new UnauthorizedError());
            };
        };

        next(new UnauthorizedError()); //Caso o usuário não envie o token ele cai nesse erro. 
    });
};