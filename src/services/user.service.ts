import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.models";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

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

    async save(user: User): Promise<void> {
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;//Deixa o ID do authentication igual do firestore
        return this.userRepository.save(user);
    };

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if(!user){
            throw new NotFoundError("Usuário não encontrado")
        }
       return user;
    };

    async update(id: string, user: User): Promise<void>{
        const userUp = await this.userRepository.getById(id);//pega o ID do usuário
        if(!userUp){
            throw new NotFoundError("Usuário não encontrado");
        } //verifica se não é valido

        userUp.nome = user.nome; //armazena o nome atualizado
        userUp.email = user.email; //armazena o email atualizado.
        this.userRepository.update(id, userUp); //Retorna as informações atualizadas.
    };

    async delete(id: string): Promise<void> {
        return this.userRepository.delete(id);
    };
};