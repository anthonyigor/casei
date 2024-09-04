import { ConvidadoController } from "../controllers/ConvidadoController";
import { UserController } from "../controllers/UserController";
import { ConvidadoRepository } from "../repositories/ConvidadoRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateConvidadoService } from "../services/convidadoServices/CreateConvidadoService";
import { GetConvidadosByUserService } from "../services/convidadoServices/GetConvidadosByUserService";
import { CreateUserService } from "../services/userServices/CreateUserService";
import { LoginService } from "../services/userServices/LoginService";
import { UpdateUserService } from "../services/userServices/UpdateUserService";

export class AppConfig {
    public static createUserController(): UserController {
        // repositories
        const userRepository = new UserRepository();

        // services
        const createUserService = new CreateUserService(userRepository);
        const loginService = new LoginService(userRepository)
        const updateUserService = new UpdateUserService(userRepository)

        return new UserController(
            createUserService,
            loginService,
            updateUserService
        )
    }

    public static createConvidadoController(): ConvidadoController {
        // repositories
        const convidadoRepository = new ConvidadoRepository();
        const userRepository = new UserRepository();

        //services
        const createConvidadoService = new CreateConvidadoService(convidadoRepository, userRepository);
        const getConvidadosByUserService = new GetConvidadosByUserService(convidadoRepository, userRepository)

        return new ConvidadoController(
            createConvidadoService,
            getConvidadosByUserService
        )
    }

}