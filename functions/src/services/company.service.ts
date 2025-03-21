import { NotFoundError } from "../errors/not-found.error.js";
import { isStorageUrlValid } from "../utils/validation-utils.js";
import { Company } from "../models/company.models.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { UploadFileService } from "./upload-file.service.js";

export class CompanyService {

    private companyRepository: CompanyRepository; //Declara o userRepository como uma variável global.
    private uploadFileService: UploadFileService;

    constructor() {
        this.companyRepository = new CompanyRepository();//Inicializa o repository
        this.uploadFileService = new UploadFileService("images/companies/")//Diretório aonde será armazenado as imagens das empresas.
    };

    async getAll(): Promise<Company[]> { //Nesse ponto dá aplicação a função recebe uma promessa que é de um array vazio 
        return this.companyRepository.getAll();//pega a repostas de todos os dados que foram requisitados.
    };

    async save(company: Company) {
        const logomarcaUrl =  await this.uploadFileService.upload(company.logoMarca);
        company.logoMarca = logomarcaUrl
        await this.companyRepository.save(company);
    };

    async getById(id: string): Promise<Company> {
        const company = await this.companyRepository.getById(id);
        if (!company) {
            throw new NotFoundError("Empresa não encontrado")
        }
        return company;
    };

    async update(id: string, company: Company): Promise<void> {
        const _company = await this.getById(id);

        if (!isStorageUrlValid(company.logoMarca)){
            _company.logoMarca = await this.uploadFileService.upload(company.logoMarca);
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        _company.cpfCnpj = company.cpfCnpj,
        _company.razaoSocial = company.razaoSocial,
        _company.nomeFantasia = company.nomeFantasia,
        _company.telefone = company.telefone,
        _company.horarioFuncionamento = company.horarioFuncionamento,
        _company.endereco = company.endereco,
        _company.localizacao=  company.localizacao,
        _company.taxaEntrega = company.taxaEntrega,
        _company.ativa =  company.ativa

        await this.companyRepository.update(_company); //Retorna as informações atualizadas.
    };
};