import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ConvidadoController } from "../controllers/ConvidadoController";

const router = Router()
const userController = new UserController()
const convidadoController = new ConvidadoController()

router.post('/create', userController.create)
router.patch('/update/:id', userController.update)
router.post('/:id/convidados/create', convidadoController.create)

export default router