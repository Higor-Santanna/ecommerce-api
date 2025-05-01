import { Request, Response } from "express";
import { Company } from "../models/company.models.js";
import { CompanyService } from "../services/company.service.js";

export class CompaniesController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = 'Obtenha todas as empresas cadastradas'
        // #swagger.description = 'Obtenha todas as empresas cadastradas.'
        res.send(await new CompanyService().getAll()); //Essa função do Express automaticamente converte o objeto JavaScript users em uma string JSON e a envia como resposta.
    };

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = 'Busque uma empresa pelo id'
        // #swagger.description = 'Obtenha uma empresa pelo id.'
        await new CompanyService().save(req.body); 
        res.status(201).send({
            message: `Empresa cadastrada com sucesso.`
        });
    };

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = 'Crie uma nova empresa'
        // #swagger.description = 'Crie uma nova empresa.'
        const companyId = req.params.id; //pega o e armazena o ID do usuário
        res.send(await new CompanyService().getById(companyId));
    };

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = 'Atualize os dados da empresa'
        // #swagger.description = 'Atualize os dados de uma empresa específica.'
        const companyId = req.params.id;
        const company = req.body as Company;
        await new CompanyService().update(companyId, company);
        res.send({ message: "Informações da empresa atualizadas" });
    };
};