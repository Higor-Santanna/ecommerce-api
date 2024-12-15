import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

type User = {
    id: number,
    nome: string,
    email: string
}

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const snapshot = await getFirestore().collection("users").get(); //nesse ponto ele conecta com o banco de dados e trás todas as informações que está neste endpoint
            const users = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            res.json(users) //Essa função do Express automaticamente converte o objeto JavaScript users em uma string JSON e a envia como resposta.
        } catch (error) {
            next(error);
        };
    };

    static async save(req: Request, res: Response) {
        try {
            let user = req.body;
            const userSave = await getFirestore().collection("users").add(user); //Nesse ponto ele cria uma coleção e faz a conexão deste controller com nosso banco dados onde será adicionado novos usuários
            res.status(201).send({
                message: `Usuário ${userSave} criado com sucesso.`
            });
        } catch (error) {
            res.status(500).send({
                message: "Erro interno do Servidor"
            });
        };

    };

    static async getById(req: Request, res: Response) {
        try {
            let userId = req.params.id; //pega o e armazena o ID do usuário
            const doc = await getFirestore().collection("users").doc(userId).get(); //Trás da coleção o ID especifico solicitado pelo usuário
            res.send({
                id: doc.id,
                ...doc.data()
            });
        } catch (error) {
            res.status(500).send({
                message: "Erro interno do Servidor"
            });
        };
    }

    static async update(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            let user = req.body as User;
            await getFirestore().collection("users").doc(userId).set({
                nome: user.nome,
                email: user.email
            });
            res.send({ message: "Informações do usuário atualizado" });
        } catch (error) {
            res.status(500).send({
                message: "Erro interno do Servidor"
            });
        };
    }

    static async delete(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            await getFirestore().collection("users").doc(userId).delete();
            res.send({ message: "Usuário deletado" });
        } catch (error) {
            res.status(500).send({
                message: "Erro interno do Servidor"
            });
        }
    }
};