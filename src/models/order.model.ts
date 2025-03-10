import { Company } from "./company.models.js";
import { Customer, customerSchema } from "./customer.model.js";
import { PaymentMethod } from "./payment-method.model.js";
import { OrderItem, orderItemSchema } from "./order-item.model.js";
import { Address, orderAddressSchema } from "./address.model.js";
import { Joi } from "celebrate";
import { DocumentData, FieldValue, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";

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
    items: OrderItem[]; //Ele deve ser opcional, porque caso venha do front ele tem um valor, porém se vim do back ele não possui valor
    status: OrderStatus;
    observacoes: string;

    constructor(data: any) {
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
        this.status = data.status ?? OrderStatus.pendente;
        this.observacoes = data.observacoes;
    }

    // getSubTotal(): number {
    //     return this.items?.map(item => item.getTotal()).reduce((total, next) => total + next, 0) ?? 0;
    // } //Essa função percorre todos os itens do nosso pedido.

    // getTotal(): number {
    //     return this.getSubTotal() + this.taxaEntrega;
    // }
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
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente),
    observacoes: Joi.string().trim().allow(null).default(null)
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

export const orderConverter: FirestoreDataConverter<Order> = {
    toFirestore: (order: Order): DocumentData => {
        return {
            empresa: {
                id: order.empresa.id,
                logoMarca: order.empresa.logoMarca,
                cpfCnpj: order.empresa.cpfCnpj,
                razaoSocial: order.empresa.razaoSocial,
                nomeFantasia: order.empresa.nomeFantasia,
                telefone: order.empresa.telefone,
                endereco: order.empresa.endereco,
                localizacao: order.empresa.localizacao
            },
            cliente: {
                nome: order.cliente.nome,
                telefone: order.cliente.telefone
            },
            endereco: {
                cep: order.endereco.cep,
                logradouro: order.endereco.logradouro,
                numero: order.endereco.numero,
                complemento: order.endereco.complemento,
                cidade: order.endereco.cidade,
                uf: order.endereco.uf
            },
            cpfCnpjCupom: order.cpfCnpjCupom,
            data: FieldValue.serverTimestamp(),// O fildValeu é uma função do firebase que salva o momento exato do registro do item no BD.
            isEntrega: order.isEntrega,
            formaPagamento: {
                id: order.formaPagamento.id,
                descricao: order.formaPagamento.descricao
            },
            taxaEntrega: order.empresa.taxaEntrega,
            status: order.status,
            observacoes: order.observacoes
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Order => {
        return new Order({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}