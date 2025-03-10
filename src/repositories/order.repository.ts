import { getFirestore, CollectionReference } from "firebase-admin/firestore";
import { Order, orderConverter, QueryParamsOrder } from "../models/order.model.js";
import dayjs from 'dayjs'
import { orderItemConverter } from "../models/order-item.model.js";

export class OrderRepository {

    private collection: CollectionReference<Order>;
    constructor(){
        this.collection = getFirestore().collection("orders").withConverter(orderConverter);
    };

    async save(order: Order){
        const batch = getFirestore().batch();

        //Cabeçalho do pedido
        const orderRef = this.collection.doc(); //Cria uma referência de um documento dentro de uma coleção.
        batch.create(orderRef, order); // Cria um novo pedido na coleção dentro do nosso lote.

        //Itens do pedido
        const itemsRef = orderRef.collection("items").withConverter(orderItemConverter)
        for (let item of order.items) {
            batch.create(itemsRef.doc(), item);
        }

        await batch.commit();
        // const orderRef = await this.collection.add(order);
        // for (let item of order.items) {
        //     await orderRef.collection("items").withConverter(orderItemConverter).add(item);
        // }
    };

    async search(queryParams: QueryParamsOrder): Promise<Order[]>{
        let query: FirebaseFirestore.Query<Order> = this.collection;

        if (queryParams.empresaId) {
            query = query.where("empresa.id", "==", queryParams.empresaId); //O where é um parâmetro que utilizamos quando precisamos fazer algum filtro.
        };

        if (queryParams.dataInicio) {
            queryParams.dataInicio = dayjs(queryParams.dataInicio).add(1, "day").startOf("day").toDate(); //Aqui eu pego a data de início adiciona mais um dia com o add(1, "day"), e o startOf faz com que ele me traga o horário do início do dia.
            query = query.where("data", ">=", queryParams.dataInicio);
        };

        if (queryParams.dataFim) {
            queryParams.dataFim = dayjs(queryParams.dataFim).add(1, "day").endOf("day").toDate(); //Aqui é a mesma logíca só que para o fim  do dia.
            query = query.where("data", "<=", queryParams.dataFim);
        };

        if (queryParams.status) {
            query = query.where("status", "==", queryParams.status);
        };

        const snapshot = await query.get();
        return snapshot.docs.map(doc => doc.data());//pega todos os dados do nosso pedido
    }
}