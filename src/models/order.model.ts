import { Company } from "./company.models.js";
import { Customer, customerSchema } from "./customer.model.js";
import { PaymentMethod } from "./payment-method.model.js";
import { OrderItem, orderItemSchema } from "./order-item.model.js";
import { Address, orderAddressSchema } from "./address.model.js";
import { Joi } from "celebrate";
import { Timestamp } from "firebase-admin/firestore";

export class Order { 
    id: string;
    empresa: Company;
    cliente: Customer;
    endereco: Address;
    cpfCnpjCupom: string;
    data: Date;
    isEntrega: boolean;
    formaPagamento: PaymentMethod;
    taxaEntrega: number;
    items: OrderItem[];
    status: OrderStatus;

    constructor(data: any){
        this.id = data.id;
        this.empresa = data.empresa;
        this.cliente = data.cliente;
        this.endereco = data.endereco;
        this.cpfCnpjCupom = data.cpfCnpjCupom;
        this.data = data.data instanceof Timestamp ? data.data.toDate() : data.data //Se a data for um Timestamp, eu pego ele com um toDate e faço a conversão dele para uma data, caso ele não seja eu apenas faço atribuição direta
        this.isEntrega = data.isEntrega;
        this.formaPagamento = data.formaPagamento;
        this.taxaEntrega = data.taxaEntrega;
        this.items = data.items;
        this.status = data.status;
    }
};

export enum OrderStatus {
    pendente = 'pendente',
    aprovado = 'aprovado',
    entrega = 'entrega',
    concluido = 'concluido',
    cancelado = 'cancelado'
};

export const newOrderSchema = Joi.object().keys({
    empresa: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    cliente: customerSchema.required(),
    endereco: Joi.alternatives().conditional(
        "isEntrega", {
            is: true, then: orderAddressSchema.required(),
            otherwise: Joi.object().only().allow(null).default(null)
        }
    ),
    cpfCnpjCupom: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).default(null),
    isEntrega: Joi.boolean().required(),
    formaPagamento: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    taxaEntrega: Joi.number().min(0).required(),
    items: Joi.array().min(1).items(orderItemSchema).required(),
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente)
});

export type QueryParamsOrder = {
    empresaId?: string;
    dataInicio?: Date;
    dataFim?: Date;
    status?: OrderStatus;
};

export const searchParamsOrderQuerySchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFim: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus))
});