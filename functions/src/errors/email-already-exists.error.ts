import { ErrorBase } from "./base.error.js";

export class EmailAlreadyExistsError extends ErrorBase {
    constructor(message = "O e-mail já está em um uso por outra conta"){
        super(409, message);
    };
};