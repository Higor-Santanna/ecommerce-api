import express, {Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { UserService } from "../services/user.service.js";
import { ForbiddenError } from "../errors/forbidden.error.js";
import { NotFoundError } from "../errors/not-found.error.js";

export const auth = (app: express.Express) =>{
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if(isRouteUnAuthenticated(req)){
            return next();
        }

        const token = req.headers.authorization?.split("Bearer ")[1]; //Nesse ponto pegamos o nosso token no entanto ele vem com dois parâmetros e nós precisamos apenas do token. Para isso utilizamos o split que quebra o esse arquivo em duas partes separando o Bearer do token.

        if(token){
            try {
                const decodeIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true) //verifica se o token é válido

                if(decodeIdToken.firebase.sign_in_provider === "anonymous") {
                    return next();
                } //se for um login anonimo, retorna um next e passo a chamada para frente.

                req.user = await new UserService().getById(decodeIdToken.uid);

                return next();
            } catch (error) {
                if (error instanceof NotFoundError) {
                    return next(new ForbiddenError()); //esse erro identifica que o usuário não existe
                } else {
                    next(new UnauthorizedError()); //aqui é o erro de não autorizado
                }
            };
        };

        next(new UnauthorizedError()); //Caso o usuário não envie o token ele cai nesse erro. 
    });

    const isRouteUnAuthenticated = (req: Request): boolean => {
        if(req.method === "POST") {
            if (req.url.startsWith("/auth/login") ||
                req.url.startsWith("/auth/recovery") ||
                req.url.startsWith("/auth/signin")){
                    return true
                } 
        }
        return false;
    }
};