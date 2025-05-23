import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
    static async login(req: Request, res: Response){
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Autenticação de usuários administradores'
        // #swagger.description = 'Rota utilizada para autenticação de usuários administradores usando e-mail e senha.'
        /* #swagger.requestBody = {
                 required: true,
                 content: {
                     "application/json": {
                         schema: {
                             $ref: "#/components/schemas/login"
                         }  
                     }
                 }
             }
            #swagger.responses[200] = {
                 description: 'Token do usuário autenticado',
                 content: {
                     "application/json": {
                         schema: {
                             type: 'object',
                             properties: {
                                'token': {
                                    type: 'string'
                                }
                             }
                         }  
                     }
                 }
             }
        */
        const {email, password} = req.body;
        const UserRecord = await new AuthService().login(email, password);
        const token = await UserRecord.user.getIdToken(true);
        res.send({
            token: token
        });
    };

    static async recovery(req: Request, res: Response){
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Recuperação de senha'
        // #swagger.description = 'Rota utilizada para recuperação de senhas através do e-mail do usuário. Receba um e-mail para recuperação de senhas.'
        /* #swagger.requestBody = {
                 required: true,
                 content: {
                     "application/json": {
                         schema: {
                             $ref: "#/components/schemas/recovery"
                         }  
                     }
                 }
             }
        */
        const {email} = req.body;
        await new AuthService().recovery(email);
        res.status(204).end();
    }; 

    static async signin(req: Request, res: Response){
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Autenticação anônima de usuários clientes'
        // #swagger.description = 'Rota utilizada para autenticação de usuários clientes para realização de pedidos sem a necessidade de um cadastro prévio.'
        /*
            #swagger.responses[200] = {
                description: 'Token do usuário anônimo',
                content: {
                    "application/json": {
                        schema: {
                            type: 'object',
                            properties: {
                                'token': {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
         */
        const UserRecord = await new AuthService().signin();
        const token = await UserRecord.user.getIdToken(true);
        res.send({
            token: token
        })
    };
};