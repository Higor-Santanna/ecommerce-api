import { User } from "../models/user.models.js";

declare global{
    namespace Express {
        export interface Request{
            user: User;
        }
    }
}