import { Request, Response } from "express";
import { Company } from "../models/company.models";
import { CompanyService } from "../services/company.service";

export class CompaniesController {
    static async getAll(req: Request, res: Response) {
        res.send(await new CompanyService().getAll()); //Essa função do Express automaticamente converte o objeto JavaScript users em uma string JSON e a envia como resposta.
    };

    static async save(req: Request, res: Response) {
        let company = req.body;
        await new CompanyService().save(company); 
        res.status(201).send({
            message: `Empresa cadastrada com sucesso.`
        });
    };

    static async getById(req: Request, res: Response) {
        let companyId = req.params.id; //pega o e armazena o ID do usuário
        res.send(await new CompanyService().getById(companyId));
    };

    static async update(req: Request, res: Response) {
        let companyId = req.params.id;
        let company = req.body as Company;
        new CompanyService().update(companyId, company);
        res.status(201).send({ message: "Informações da empresa atualizadas" });
    };
};