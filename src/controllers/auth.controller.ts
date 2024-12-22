import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async login(req: Request, res: Response){
        const {email, password} = req.body;
        const UserRecord = await new AuthService().login(email, password);
        const token = await UserRecord.user.getIdToken(true);
        res.send({
            token: token
        });
    };
};