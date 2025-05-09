import { NotFoundError } from "../errors/not-found.error.js";
import { User } from "../models/user.models.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "./auth.service.js";

export class UserService {

    private userRepository: UserRepository; //Declara o userRepository como uma variável global.
    private authService: AuthService; //chama nosso serviço

    constructor(){
        this.userRepository = new UserRepository();//Inicializa o repository
        this.authService = new AuthService(); //Inicializa o serviço
    };

    async getAll(): Promise<User[]> { //Nesse ponto dá aplicação a função recebe uma promessa que é de um array vazio 
        return this.userRepository.getAll();//pega a repostas de todos os dados que foram requisitados.
    };

    async save(user: User) {
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;//Deixa o ID do authentication igual do firestore
        await this.userRepository.update(user);
    };

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if(!user){
            throw new NotFoundError("Usuário não encontrado")
        }
       return user;
    };

    async update(id: string, user: User): Promise<void>{
        const _user = await this.userRepository.getById(id);//pega o ID do usuário
        if(!_user){
            throw new NotFoundError("Usuário não encontrado");
        } //verifica se não é valido

        _user.nome = user.nome; //armazena o nome atualizado
        _user.email = user.email; //armazena o email atualizado.

        await this.authService.update(id, user);
        await this.userRepository.update(_user); //Retorna as informações atualizadas.
    };

    async delete(id: string): Promise<void> {
        await this.authService.delete(id); //exlcui o usuário do banco de dados e do authetication
        await this.userRepository.delete(id); //exclui o usuário apenas do banco de dados
    };
};