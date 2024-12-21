import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.models";

export class UserRepository {

    private collection: CollectionReference; //aqui ele armezena a referência abaixo.
    
    constructor(){
        this.collection = getFirestore().collection("users"); //Issoé um referência para minha coleção com o intuito de evitar repetir esse trecho de código.
    }

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get(); //nesse ponto ele conecta com o banco de dados e trás todas as informações que está neste endpoint
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[]; //aqui nesse ponto ele retorna o array já com as informações.
    };

    async save(user: User): Promise<void> {
        delete user.password
        await this.collection.add(user); //Nesse ponto ele cria uma coleção e faz a conexão deste controller com nosso banco dados onde será adicionado novos usuários
    };

    async getById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get(); //Trás da coleção o ID especifico solicitado pelo usuário
        if (doc.exists) { //doc.exists é uma propriedade do documento que confirma sua existância.
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        } else {
            return null;
        };
    };

    async update(id: string, user: User): Promise<void> {
        let docRef = this.collection.doc(id);
        await docRef.set({
            nome: user.nome,
            email: user.email
        });
    };

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
};