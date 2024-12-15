import { ErrorBase } from "./base.error"

export class InternalServerError extends ErrorBase {
    constructor(message = "Erro interno do Servidor"){
        super(500, message);
    };
};