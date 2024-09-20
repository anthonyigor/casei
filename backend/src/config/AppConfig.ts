import { ConvidadoController } from "../controllers/ConvidadoController";
import { PresenteController } from "../controllers/PresenteController";
import { UserController } from "../controllers/UserController";
import { ConvidadoRepository } from "../repositories/ConvidadoRepository";
import { PresenteRepository } from "../repositories/PresenteRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateConvidadoService } from "../services/convidadoServices/CreateConvidadoService";
import { GetConvidadosByUserService } from "../services/convidadoServices/GetConvidadosByUserService";
import { GetConvidadoService } from "../services/convidadoServices/GetConvidadoService";
import { UploadFileToS3 } from "../services/fileServices/UploadFileToS3";
import { CreatePresenteService } from "../services/presenteServices/CreatePresenteService";
import { GetPresentesByUserService } from "../services/presenteServices/GetPresentesByUserService";
import { GetPresentesDisponiveisByUserService } from "../services/presenteServices/GetPresentesDisponiveisByUserService";
import { CreateUserService } from "../services/userServices/CreateUserService";
import { FindUserByIDService } from "../services/userServices/FindUserByIDService";
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
        const getConvidadosByUserService = new GetConvidadosByUserService(convidadoRepository, userRepository);
        const getConvidadoService = new GetConvidadoService(convidadoRepository);

        return new ConvidadoController(
            createConvidadoService,
            getConvidadosByUserService,
            getConvidadoService
        )
    }

    public static createPresenteController(): PresenteController {
        // repositories
        const presenteRepository = new PresenteRepository();
        const userRepository = new UserRepository();

        // services
        const getPresentesByUserService = new GetPresentesByUserService(presenteRepository)
        const getPresentesDisponiveisByUserService = new GetPresentesDisponiveisByUserService(presenteRepository)
        const uploadFileToS3 = new UploadFileToS3()
        const createPresenteService = new CreatePresenteService(presenteRepository)
        const findUserByEmailService = new FindUserByIDService(userRepository)

        return new PresenteController(
            getPresentesByUserService,
            getPresentesDisponiveisByUserService,
            uploadFileToS3,
            createPresenteService,
            findUserByEmailService
        )
    }

}