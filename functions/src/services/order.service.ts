import { NotFoundError } from "../errors/not-found.error.js";
import { Order, OrderStatus, QueryParamsOrder } from "../models/order.model.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { OrderItem } from "../models/order-item.model.js";

export class OrderService {

    private orderRepository: OrderRepository;
    private companyRepository: CompanyRepository;
    private paymentMethodRepository: PaymentMethodRepository;
    private productRepository: ProductRepository;
    static orderRepository: any;

    constructor(){
        this.orderRepository = new OrderRepository();
        this.companyRepository = new CompanyRepository();
        this.paymentMethodRepository = new PaymentMethodRepository();
        this.productRepository = new ProductRepository();
    }

    async save(order: Order){
        const empresa = await this.companyRepository.getById(order.empresa.id!);
        if(!empresa) {
            throw new NotFoundError("Empresa não encontrada!");
        };
        order.empresa = empresa; //atribui o nome da empresa que está no banco de dados, para o pedido em específico.

        const formaPagamento = await this.paymentMethodRepository.getById(order.formaPagamento.id);
        if(!formaPagamento){
            throw new NotFoundError("Forma de Pagamento não encontrada!");
        }
        order.formaPagamento = formaPagamento;//atribui a forma de pagamento que está no banco de dados, para a forma de pagemento do pedido.

        for (const item of order.items!) {
            const produto = await this.productRepository.getById(item.produto.id);
            if(!produto){
                throw new NotFoundError("Produto não encontrado!");
            };
            item.produto = produto;
        } //Nesse laço e faz a verificação de cada item dentro do order.items que está dentro dos pedidos.

        await this.orderRepository.save(order);
    };

    async search(query: QueryParamsOrder): Promise<Order[]> {
       return this.orderRepository.search(query);// Faz a chamada do repository
    };

    async getItems(pedidoId: string): Promise<OrderItem[]> {
        return this.orderRepository.getItems(pedidoId);
    };

    async getById(pedidoId: string): Promise<Order> {
        return this.orderRepository.getById(pedidoId);
    };

    async changeStatus(pedidoId: string, status: OrderStatus){
        await this.orderRepository.changeStatus(pedidoId, status);
    };
};