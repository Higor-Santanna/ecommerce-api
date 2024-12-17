import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.models";

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection("users").get(); //nesse ponto ele conecta com o banco de dados e trás todas as informações que está neste endpoint
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        res.json(users) //Essa função do Express automaticamente converte o objeto JavaScript users em uma string JSON e a envia como resposta.
    };

    static async save(req: Request, res: Response, next: NextFunction) {
        let user = req.body;
        const userSave = await getFirestore().collection("users").add(user); //Nesse ponto ele cria uma coleção e faz a conexão deste controller com nosso banco dados onde será adicionado novos usuários
        res.status(201).send({
            message: `Usuário ${userSave} criado com sucesso.`
        });
    };

    static async getById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id; //pega o e armazena o ID do usuário
        const doc = await getFirestore().collection("users").doc(userId).get(); //Trás da coleção o ID especifico solicitado pelo usuário
        if (doc.exists) { //doc.exists é uma propriedade do documento que confirma sua existância.
            res.send({
                id: doc.id,
                ...doc.data()
            });
        } else {
            throw new NotFoundError("Usuário não encontrado")
        };
    };

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        let user = req.body as User;
        let docRef = getFirestore().collection("users").doc(userId);

        if ((await docRef.get()).exists) {
            await docRef.set({
                nome: user.nome,
                email: user.email
            });
            res.status(201).send({ message: "Informações do usuário atualizado" });
        } else {
            throw new NotFoundError("Usuário não encontrado")
        }
    };

    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        await getFirestore().collection("users").doc(userId).delete();
        res.status(204).send({ message: "Usuário deletado" });
    };
};