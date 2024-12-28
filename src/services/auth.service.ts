import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { User } from "../models/user.models";
import { getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from "firebase/auth"

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

    async update(id: string, user: User){
        const props: UpdateRequest = {
            displayName: user.nome,
            email: user.email
        };

        if(user.password){
            props.password = user.password
        };

        await getAuth().updateUser(id, props);
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

    async delete(id: string){
        await getAuth().deleteUser(id);
    }

    async recovery(email: string){
        await sendPasswordResetEmail(getFirebaseAuth(), email);
    }
};