import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User, userConverter } from "../models/user.models.js";

export class UserRepository {

    private collection: CollectionReference<User>; //aqui ele armezena a referência abaixo.
    
    constructor(){
        this.collection = getFirestore().collection("users").withConverter(userConverter); //Isso é um referência para minha coleção com o intuito de evitar repetir esse trecho de código.
    }

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get(); //nesse ponto ele conecta com o banco de dados e trás todas as informações que está neste endpoint
        return snapshot.docs.map(doc => doc.data()); //aqui nesse ponto ele retorna o array já com as informações.
    };

    async save(user: User): Promise<void> {
        await this.collection.add(user); //Nesse ponto ele cria uma coleção e faz a conexão deste controller com nosso banco dados onde será adicionado novos usuários
    };

    async getById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get(); //Trás da coleção o ID especifico solicitado pelo usuário
        return doc.data() ?? null;
    };

    async update(user: User){
        await this.collection.doc(user.id).set(user);
    };

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
};