import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserService } from "../services/userServices/CreateUserService";
import { LoginService } from "../services/userServices/LoginService";

export class AppConfig {
    public static createUserController(): UserController {
        // repositories
        const userRepository = new UserRepository();

        // services
        const createUserService = new CreateUserService(userRepository);
        const loginService = new LoginService(userRepository)

        return new UserController(
            createUserService,
            loginService
        )
    }

}