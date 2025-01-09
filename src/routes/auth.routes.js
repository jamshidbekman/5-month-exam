import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const AuthRouter = Router();

const authController = new AuthController();

AuthRouter.post("/auth/register", (req, res) => authController.registerController(req, res));
AuthRouter.post("/auth/login", (req, res) => authController.loginController(req, res));

export default AuthRouter;
