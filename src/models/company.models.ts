import { Joi } from "celebrate";
import { phoneRegexPattern } from "../utils/regex-utils.js";

export type Company = {
    id?: string;
    logoMarca: string;
    cpfCnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    telefone: string;
    horarioFuncionamento: string;
    endereco: string;
    localizacao: string;
    taxaEntrega: number;
    ativa: boolean;
}

export const newCompanySchema = Joi.object().keys({
    logoMarca: Joi.string().base64().required(),
    cpfCnpj: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ),
    razaoSocial: Joi.string().trim().required(),
    nomeFantasia: Joi.string().trim().required(),
    telefone: Joi.string().regex(phoneRegexPattern).required(),
    horarioFuncionamento: Joi.string().trim().required(),
    endereco: Joi.string().trim().required(),
    localizacao: Joi.string().trim().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().only().allow(true).default(true)
});

export const updateCompanySchema = Joi.object().keys({
    logoMarca: Joi.alternatives().try(
        Joi.string().base64().required(),
        Joi.string().uri().required(),
    ).required(),
    cpfCnpj: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).required(),
    razaoSocial: Joi.string().trim().required(),
    nomeFantasia: Joi.string().trim().required(),
    telefone: Joi.string().regex(phoneRegexPattern).required(),
    horarioFuncionamento: Joi.string().trim().required(),
    endereco: Joi.string().trim().required(),
    localizacao: Joi.string().trim().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().required()
})