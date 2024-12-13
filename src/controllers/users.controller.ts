import { Request, Response } from "express";
import {getFirestore} from "firebase-admin/firestore";

export class UsersController {
    static async getAll (req: Request, res: Response){
        const snapshot = await getFirestore().collection("users").get(); //nesse ponto ele conecta com o banco de dados e trás todas as informações que está neste endpoint
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        res.send(`Os usuários são: ${users}`)
    };

    static async save(req: Request, res: Response){
        let user = req.body;
        const userSave = await getFirestore().collection("users").add(user); //Nesse ponto ele cria uma coleção e faz a conexão deste controller com nosso banco dados onde será adicionado novos usuários
        res.send({
            message: `Usuário ${userSave} criado com sucesso.`
        });
    };
};