import { Router } from "express";
import { verifyToken } from "../helpers/verify-token";
import { AppConfig } from "../config/AppConfig";
import { validateRequestSchema } from "../middlewares/validateRequest";
import { convidadoSchema, createUserSchema, getConvidadoSchema, loginSchema } from "../utils/validators";
import imageUpload from "../helpers/image-upload";
import { validateParamsRequest } from "../middlewares/validateParamsRequest";

const router = Router()

const userController = AppConfig.createUserController()
const convidadoController = AppConfig.createConvidadoController()
const presenteController = AppConfig.createPresenteController()

router.post('/create', validateRequestSchema(createUserSchema), (req, res) => userController.create(req, res))
router.post('/login', validateRequestSchema(loginSchema), (req, res) => userController.login(req, res))
router.get('/:id', (req, res) => userController.getUser(req, res))
router.patch('/update/:id', verifyToken, validateRequestSchema(createUserSchema), (req, res) => userController.update(req, res))
router.post('/:id/convidados/create', verifyToken, validateRequestSchema(convidadoSchema), (req, res) => convidadoController.create(req, res))
router.get('/:id/convidados', (req, res) => convidadoController.getConvidados(req, res))
router.get('/:id/convidados/:convidadoId', verifyToken, (req, res) => convidadoController.getConvidado(req, res))
router.post('/:id/convidados/identificate', (req, res) => convidadoController.identificateConvidado(req, res))
router.put('/:id/convidados/:convidadoId', verifyToken, (req, res) => convidadoController.editConvidado(req, res))
router.get('/:id/presentes/disponiveis', (req, res) => presenteController.getPresentesDisponiveis(req, res))
router.get('/:id/presentes', verifyToken, (req, res) => presenteController.getPresentes(req, res))
router.get('/:id/presentes/:presenteId', verifyToken, (req, res) => presenteController.getPresente(req, res))
router.put('/:id/presentes/:presenteId', verifyToken, imageUpload.single('image'), (req, res) => presenteController.editPresente(req, res))
router.post('/:id/presentes/create', verifyToken, imageUpload.single('image'), (req, res) => presenteController.create(req, res))
router.post('/:id/presentes/:presenteId/selecionar', (req, res) => presenteController.selectPresente(req, res))
router.post('/:id/presentes/qrcode', (req, res) => presenteController.gerarQrCode(req, res))

export default router