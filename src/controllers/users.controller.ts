import { Request, Response } from "express"

export class UsersController {
    static getAll (req: Request, res: Response){
        res.send("Tá funcionando os usuários com controllers")
    };
};