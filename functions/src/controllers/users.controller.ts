import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.models.js";
import { UserService } from "../services/user.service.js";

export class UsersController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async getAll(req: Request, res: Response, next: NextFunction) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Obtenha todos os usuários cadastrados'
        // #swagger.description = 'Obtenha todos os usuários da empresa.'
        /* 
            #swagger.responses[200] = {
                description: 'Dados do usuário',
                content: {
                    "aplications/json": {
                        schemas: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'string'
                                    },
                                    nome: {
                                        type: 'string'
                                    },
                                    email: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        */
        res.send(await new UserService().getAll()); //Essa função do Express automaticamente converte o objeto JavaScript users em uma string JSON e a envia como resposta.
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async save(req: Request, res: Response, next: NextFunction) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Crie um novo usuário'
        // #swagger.description = 'Crie um novo usuário para acessar as funcionalidades da empresa.'
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addUser"
                    }  
                }
            }
        } 
        */
        const user = req.body;
        await new UserService().save(user);
        res.status(201).send({
            message: `Usuário criado com sucesso.`
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async getById(req: Request, res: Response, next: NextFunction) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Busque um usuário pelo id'
        // #swagger.description = 'Obtenha um usuário pelo id.'
        /* 
            #swagger.responses[200] = {
                description: 'Dados do usuário',
                content: {
                    "aplications/json": {
                        schemas: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string'
                                },
                                nome: {
                                    type: 'string'
                                },
                                email: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        */
        const userId = req.params.id; //pega o e armazena o ID do usuário
        res.send(await new UserService().getById(userId));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async update(req: Request, res: Response, next: NextFunction) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Atualize os dados do usuário'
        // #swagger.description = 'Atualize os dados de um usuário específico.'
         /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateUser"
                    }  
                }
            }
        } 
        */
        const userId = req.params.id;
        const user = req.body as User;
        await new UserService().update(userId, user);
        res.status(201).send({ message: "Informações do usuário atualizado" });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async delete(req: Request, res: Response, next: NextFunction) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Exclua um usuário'
        // #swagger.description = 'Exclua um usuário pelo id.<br><br><b>Obs.:</b> <i>Essa ação é irreversível. Após excluído não será possível recuperar os dados do usuário.</i>'
        const userId = req.params.id;
        await new UserService().delete(userId);
        res.status(204).end();
    };
};