import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { User } from "../models/user.models";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth"

export class AuthService {

    async create(user: User): Promise<UserRecord> {
        return await getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome
        }).catch(err => {
            if (err.code === "auth/email-already-exists") {//pega o erro dado no servidor
                throw new EmailAlreadyExistsError(); //se for aquele erro executa esse tratamento
            }
            throw err;//se não ele executa o erro padrão
        });
    };

    //Obter a credencial do usuário - login
    async login(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
            .catch(err => {
                if (err.code === "auth/invalid-credential") {
                    throw new UnauthorizedError();
                };
                throw err;
            });
    };
};