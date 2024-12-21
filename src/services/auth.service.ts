import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { User } from "../models/user.models";
import { getAuth, UserRecord } from "firebase-admin/auth"

export class AuthService {

    create(user: User): Promise<UserRecord> { 
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome
        }).catch(err => {
            if(err.code === "auth/email-already-exists"){//pega o erro dado no servidor
                throw new EmailAlreadyExistsError(); //se for aquele erro executa esse tratamento
            }
            throw err;//se não ele executa o erro padrão
        });
    };
};