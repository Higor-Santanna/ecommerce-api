import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company, companyConverter } from "../models/company.models.js";

export class CompanyRepository {

    private collection: CollectionReference<Company>; //aqui ele armezena a referência abaixo.
    
    constructor(){
        this.collection = getFirestore()
        .collection("companies")
        .withConverter(companyConverter); //Issoé um referência para minha coleção com o intuito de evitar repetir esse trecho de código.
    }

    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.get(); //nesse ponto ele conecta com o banco de dados e trás todas as informações que está neste endpoint
        return snapshot.docs.map(doc => doc.data()); //aqui nesse ponto ele retorna o array já com as informações.
    };

    async save(company: Company): Promise<void> {
        await this.collection.add(company); //Nesse ponto ele cria uma coleção e faz a conexão deste controller com nosso banco dados onde será adicionado novos usuários
    };

    async getById(id: string): Promise<Company | null> {
        const doc = await this.collection.doc(id).get(); //Trás da coleção o ID especifico solicitado pelo usuário
        return doc.data() ?? null; //retorna a coleção se ele não existe ele retorna um null
    };

    async update(company: Company){
        await this.collection//acesso a coleção
        .doc(company.id)//digo qual atributo quero alterar
        .set(company);//o que eu quero alterar nessa atributo
    };
};