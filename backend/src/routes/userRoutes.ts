import { Router } from "express";
import { ConvidadoController } from "../controllers/ConvidadoController";
import { verifyToken } from "../helpers/verify-token";
import { AppConfig } from "../config/AppConfig";

const router = Router()

const userController = AppConfig.createUserController()
const convidadoController = new ConvidadoController()

router.post('/create', (req, res) => userController.create(req, res))
router.post('/login', (req, res) => userController.login(req, res))
router.patch('/update/:id', verifyToken, (req, res) => userController.update(req, res))
router.post('/:id/convidados/create', verifyToken, convidadoController.create)
router.post('/convidados', convidadoController.getConvidados)

export default router