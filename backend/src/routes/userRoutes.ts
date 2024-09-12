import { Router } from "express";
import { verifyToken } from "../helpers/verify-token";
import { AppConfig } from "../config/AppConfig";
import { validateRequestSchema } from "../middlewares/validateRequest";
import { convidadoSchema, createUserSchema, loginSchema } from "../utils/validators";

const router = Router()

const userController = AppConfig.createUserController()
const convidadoController = AppConfig.createConvidadoController()
const presenteController = AppConfig.createPresenteController()

router.post('/create', validateRequestSchema(createUserSchema), (req, res) => userController.create(req, res))
router.post('/login', validateRequestSchema(loginSchema), (req, res) => userController.login(req, res))
router.patch('/update/:id', verifyToken, validateRequestSchema(createUserSchema), (req, res) => userController.update(req, res))
router.post('/:id/convidados/create', verifyToken, validateRequestSchema(convidadoSchema), (req, res) => convidadoController.create(req, res))
router.get('/:id/convidados', (req, res) => convidadoController.getConvidados(req, res))
router.get('/:id/presentes', verifyToken, (req, res) => presenteController.getPresentes(req, res))

export default router