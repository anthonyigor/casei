import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/UserRepository";
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

}