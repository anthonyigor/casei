import { ConvidadoController } from "../controllers/ConvidadoController";
import { PresenteController } from "../controllers/PresenteController";
import { UserController } from "../controllers/UserController";
import { ConvidadoRepository } from "../repositories/ConvidadoRepository";
import { PresenteRepository } from "../repositories/PresenteRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateConvidadoService } from "../services/convidadoServices/CreateConvidadoService";
import { GetConvidadosByUserService } from "../services/convidadoServices/GetConvidadosByUserService";
import { UploadFileToS3 } from "../services/fileServices/UploadFileToS3";
import { GetPresentesByUserService } from "../services/presenteServices/GetPresentesByUserService";
import { GetPresentesDisponiveisByUserService } from "../services/presenteServices/GetPresentesDisponiveisByUserService";
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

    public static createPresenteController(): PresenteController {
        // repositories
        const presenteRepository = new PresenteRepository();

        // services
        const getPresentesByUserService = new GetPresentesByUserService(presenteRepository)
        const getPresentesDisponiveisByUserService = new GetPresentesDisponiveisByUserService(presenteRepository)
        const uploadFileToS3 = new UploadFileToS3()

        return new PresenteController(
            getPresentesByUserService,
            getPresentesDisponiveisByUserService,
            uploadFileToS3
        )
    }

}