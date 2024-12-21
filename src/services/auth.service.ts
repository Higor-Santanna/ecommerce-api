import { User } from "../models/user.models";
import { getAuth, UserRecord } from "firebase-admin/auth"

export class AuthService {

    create(user: User): Promise<UserRecord> { 
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome
        });
    };
};