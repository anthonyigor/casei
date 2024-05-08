import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ConvidadoController } from "../controllers/ConvidadoController";
import { verifyToken } from "../helpers/verify-token";

const router = Router()

const userController = new UserController()
const convidadoController = new ConvidadoController()

router.post('/create', userController.create)
router.post('/login', userController.login)
router.patch('/update/:id', verifyToken, userController.update)
router.post('/:id/convidados/create', verifyToken, convidadoController.create)
router.post('/convidados', convidadoController.getConvidados)

export default router