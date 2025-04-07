import { ConvidadoController } from "../controllers/ConvidadoController";
import { PresenteController } from "../controllers/PresenteController";
import { UserController } from "../controllers/UserController";
import { ConvidadoRepository } from "../repositories/ConvidadoRepository";
import { PresenteRepository } from "../repositories/PresenteRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ConfirmarPresencaConvidadoService } from "../services/convidadoServices/ConfirmarPresencaConvidadoService";
import { CreateConvidadoService } from "../services/convidadoServices/CreateConvidadoService";
import { DeleteConvidadoService } from "../services/convidadoServices/DeleteConvidadoService";
import { GetConvidadoByNomeService } from "../services/convidadoServices/GetConvidadoByNomeService";
import { GetConvidadoByTelefoneService } from "../services/convidadoServices/GetConvidadoByTelefoneService";
import { GetConvidadosByUserService } from "../services/convidadoServices/GetConvidadosByUserService";
import { GetConvidadoService } from "../services/convidadoServices/GetConvidadoService";
import { UpdateConvidadoService } from "../services/convidadoServices/UpdateConvidadoService";
import { DeleteFileFromS3 } from "../services/fileServices/DeleteFileFromS3";
import { UploadFileToS3 } from "../services/fileServices/UploadFileToS3";
import { CreatePresenteService } from "../services/presenteServices/CreatePresenteService";
import { DeletePresenteService } from "../services/presenteServices/DeletePresenteService";
import { GetPresentesByUserService } from "../services/presenteServices/GetPresentesByUserService";
import { GetPresentesConvidadoService } from "../services/presenteServices/GetPresentesConvidadoService";
import { GetPresentesDisponiveisByUserService } from "../services/presenteServices/GetPresentesDisponiveisByUserService";
import { GetPresenteService } from "../services/presenteServices/GetPresenteService";
import { SetPresenteConvidado } from "../services/presenteServices/SetPresenteConvidado";
import { UnsetPresenteConvidado } from "../services/presenteServices/UnsetPresenteConvidado";
import { UpdatePresenteService } from "../services/presenteServices/UpdatePresenteService";
import { CreateUserService } from "../services/userServices/CreateUserService";
import { DashboardService } from "../services/userServices/DashboardService";
import { FindUserByIDService } from "../services/userServices/FindUserByIDService";
import { GetUserCasamento } from "../services/userServices/GetUserCasamento";
import { LoginService } from "../services/userServices/LoginService";
import { UpdateConviteService } from "../services/userServices/UpdateConviteService";
import { UpdatePasswordService } from "../services/userServices/UpdatePasswordService";
import { UpdateUserService } from "../services/userServices/UpdateUserService";

export class AppConfig {
    public static createUserController(): UserController {
        // repositories
        const userRepository = new UserRepository();
        const convidadoRepository = new ConvidadoRepository();

        // services
        const createUserService = new CreateUserService(userRepository);
        const loginService = new LoginService(userRepository)
        const updateUserService = new UpdateUserService(userRepository)
        const getUserCasamentoService = new GetUserCasamento(userRepository) 
        const findUserByIdService = new FindUserByIDService(userRepository)
        const uploadFileService = new UploadFileToS3()
        const updateConviteUrlService = new UpdateConviteService(userRepository)
        const updatePasswordService = new UpdatePasswordService(userRepository)
        const dashboardService = new DashboardService(userRepository, convidadoRepository)

        return new UserController(
            createUserService,
            loginService,
            updateUserService,
            getUserCasamentoService,
            findUserByIdService,
            uploadFileService,
            updateConviteUrlService,
            updatePasswordService,
            dashboardService
        )
    }

    public static createConvidadoController(): ConvidadoController {
        // repositories
        const convidadoRepository = new ConvidadoRepository();
        const userRepository = new UserRepository();
        const presenteRepository = new PresenteRepository();

        //services
        const createConvidadoService = new CreateConvidadoService(convidadoRepository, userRepository);
        const getConvidadosByUserService = new GetConvidadosByUserService(convidadoRepository, userRepository);
        const getConvidadoService = new GetConvidadoService(convidadoRepository);
        const setPresenteConvidado = new SetPresenteConvidado(presenteRepository);
        const updateConvidadoService = new UpdateConvidadoService(convidadoRepository);
        const getPresenteConvidadoService = new GetPresentesConvidadoService(presenteRepository);
        const unsetPresenteConvidado = new UnsetPresenteConvidado(presenteRepository);
        const getConvidadoByTelefoneService = new GetConvidadoByTelefoneService(convidadoRepository);
        const confirmarPresencaConvidadoService = new ConfirmarPresencaConvidadoService(convidadoRepository);
        const getConvidadoByNomeService = new GetConvidadoByNomeService(convidadoRepository);
        const deleteConvidadoService = new DeleteConvidadoService(convidadoRepository, userRepository);

        return new ConvidadoController(
            createConvidadoService,
            getConvidadosByUserService,
            getConvidadoService,
            setPresenteConvidado,
            updateConvidadoService,
            getPresenteConvidadoService,
            unsetPresenteConvidado,
            getConvidadoByTelefoneService,
            confirmarPresencaConvidadoService,
            getConvidadoByNomeService,
            deleteConvidadoService
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
        const getPresenteService = new GetPresenteService(presenteRepository);
        const updatePresenteService = new UpdatePresenteService(presenteRepository);
        const setPresenteConvidadoService = new SetPresenteConvidado(presenteRepository);
        const deleteFileService = new DeleteFileFromS3();
        const deletePresenteService = new DeletePresenteService(presenteRepository);

        return new PresenteController(
            getPresentesByUserService,
            getPresentesDisponiveisByUserService,
            uploadFileToS3,
            createPresenteService,
            findUserByEmailService,
            getPresenteService,
            updatePresenteService,
            deleteFileService,
            setPresenteConvidadoService,
            deletePresenteService
        )
    }

}