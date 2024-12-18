import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.models";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {
    async getAll(): Promise<User[]> { //Nesse ponto dá aplicação a função recebe uma promessa que é de um array vazio 
        const snapshot = await getFirestore().collection("users").get(); //nesse ponto ele conecta com o banco de dados e trás todas as informações que está neste endpoint
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[]; //aqui nesse ponto ele retorna o array já com as informações.
    }

    async save(user: User): Promise<void> {
        await getFirestore().collection("users").add(user); //Nesse ponto ele cria uma coleção e faz a conexão deste controller com nosso banco dados onde será adicionado novos usuários
    };

    async getById(id: string): Promise<User> {
        const doc = await getFirestore().collection("users").doc(id).get(); //Trás da coleção o ID especifico solicitado pelo usuário
        if (doc.exists) { //doc.exists é uma propriedade do documento que confirma sua existância.
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        } else {
            throw new NotFoundError("Usuário não encontrado")
        };
    };

    async update(id: string, user: User): Promise<void>{
        let docRef = getFirestore().collection("users").doc(id);

        if ((await docRef.get()).exists) {
            await docRef.set({
                nome: user.nome,
                email: user.email
            });
        } else {
            throw new NotFoundError("Usuário não encontrado")
        }
    }

    async delete(id: string): Promise<void> {
        await getFirestore().collection("users").doc(id).delete();
    }
};