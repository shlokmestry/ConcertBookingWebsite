import { Router } from "express";
const router = Router();
import {
  validateUserRegister,
  validateUserLogin,
} from "../middleware/validationHandler.js";
import { login, logoutUser, register } from "../controller/authContoller.js";

router.post("/register", validateUserRegister, register);
router.post("/login", validateUserLogin, login);
router.get("/logout", logoutUser);

export default router;
