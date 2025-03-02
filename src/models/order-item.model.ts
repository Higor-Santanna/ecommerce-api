import { Joi } from "celebrate";
import { Product } from "./product.models.js";

export type OrderItem = {
    produto: Product;
    qtde: number;
    observacao: string;    
}

export const orderItemSchema = Joi.object().keys({
    produto: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    qtde: Joi.number().integer().positive().required(),
    observacao: Joi.string().trim().allow(null).default(null)
});