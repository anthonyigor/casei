import { Router } from "express";
import { UserController } from "../controlllers/UserController";

const router = Router()
const userController = new UserController()

router.post('/create', userController.create)

export default router