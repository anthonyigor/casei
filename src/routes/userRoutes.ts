import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router()
const userController = new UserController()

router.post('/create', userController.create)
router.patch('/update/:id', userController.update)

export default router