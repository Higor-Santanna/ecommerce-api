import { getFirestore, CollectionReference } from "firebase-admin/firestore";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import dayjs from 'dayjs'

export class OrderRepository {

    private collection: CollectionReference;
    constructor(){
        this.collection = getFirestore().collection("orders");
    };

    async save(order: Order){
        await this.collection.add(order);
    };

    async search(queryParams: QueryParamsOrder): Promise<Order[]>{
        let query: FirebaseFirestore.Query = this.collection;

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
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            } as unknown;
        }) as Order[];//pega todos os dados do nosso pedido
    }
}