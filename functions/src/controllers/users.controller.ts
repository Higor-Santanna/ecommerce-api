import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.models.js";
import { UserService } from "../services/user.service.js";

export class UsersController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().getAll()); //Essa função do Express automaticamente converte o objeto JavaScript users em uma string JSON e a envia como resposta.
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async save(req: Request, res: Response, next: NextFunction) {
        const user = req.body;
        await new UserService().save(user); 
        res.status(201).send({
            message: `Usuário criado com sucesso.`
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async getById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id; //pega o e armazena o ID do usuário
        res.send(await new UserService().getById(userId));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async update(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        const user = req.body as User;
        await new UserService().update(userId, user);
        res.status(201).send({ message: "Informações do usuário atualizado" });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async delete(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        await new UserService().delete(userId);
        res.status(204).end();
    };
};