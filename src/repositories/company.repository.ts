import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company } from "../models/company.models.js";

export class CompanyRepository {

    private collection: CollectionReference; //aqui ele armezena a referência abaixo.
    
    constructor(){
        this.collection = getFirestore().collection("companies"); //Issoé um referência para minha coleção com o intuito de evitar repetir esse trecho de código.
    }

    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.get(); //nesse ponto ele conecta com o banco de dados e trás todas as informações que está neste endpoint
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Company[]; //aqui nesse ponto ele retorna o array já com as informações.
    };

    async save(company: Company): Promise<void> {
        await this.collection.add(company); //Nesse ponto ele cria uma coleção e faz a conexão deste controller com nosso banco dados onde será adicionado novos usuários
    };

    async getById(id: string): Promise<Company | null> {
        const doc = await this.collection.doc(id).get(); //Trás da coleção o ID especifico solicitado pelo usuário
        if (doc.exists) { //doc.exists é uma propriedade do documento que confirma sua existância.
            return {
                id: doc.id,
                ...doc.data()
            } as Company;
        } else {
            return null;
        };
    };

    async update(company: Company){
        let docRef = this.collection.doc(company.id!);//Garante que o ID existe
        delete company.id;
        await docRef.set(company);
    };
};